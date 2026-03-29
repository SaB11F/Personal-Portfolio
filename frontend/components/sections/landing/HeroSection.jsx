import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  PanResponder,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

import { palette, surface } from "../../../lib/theme";
import {
  HERO_CHIPS,
  ORBITAL_CARD_GHOSTS,
  ORBITAL_CARD_THEMES,
} from "./HeroSection.constants";
import OrbitGhostArtwork from "./OrbitGhostArtwork";
import OrbitControlButton from "./OrbitControlButton";
import { getOrbitCardState, getProjectIconName } from "./HeroSection.helpers";
import { styles } from "./HeroSection.style";

const PROJECT_IMAGE_SOURCES = {
  "rag-assistant": require("../../../assets/orbital_cards/web/ersko-card.jpg"),
  "fogponic-system": require("../../../assets/orbital_cards/web/fogponic-card.jpg"),
  sopkomat: require("../../../assets/orbital_cards/web/sopkomat-card.jpg"),
  "speed-bump": require("../../../assets/orbital_cards/web/speed-bump-card.jpg"),
  "esa-cansat": require("../../../assets/gallery/ring/cansat-card.jpg"),
};

const SWIPE_CAPTURE_DISTANCE = 12;
const SWIPE_TRIGGER_DISTANCE = 42;

function HeroSection({ hero, isWide, onJourneyPress, onTalkPress, projects }) {
  const [orbitStep, setOrbitStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardWidth = isWide ? 548 : 288;
  const cardHeight = isWide ? 638 : 356;
  const defaultGithubUrl =
    hero.ctas.find((cta) => cta.label.toLowerCase() === "github")?.href || null;
  const totalProjects = projects.length;
  const angleStep = totalProjects ? 360 / totalProjects : 0;
  const angle = orbitStep * angleStep;
  const nextProjectTitle =
    totalProjects > 1
      ? projects[getWrappedIndex(orbitStep + 1, totalProjects)]?.title
      : null;

  useEffect(() => {
    if (Platform.OS !== "web") {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReduceMotionChange = () => {
      setPrefersReducedMotion(reduceMotionQuery.matches);
    };

    handleReduceMotionChange();

    if (typeof reduceMotionQuery.addEventListener === "function") {
      reduceMotionQuery.addEventListener("change", handleReduceMotionChange);
    } else if (typeof reduceMotionQuery.addListener === "function") {
      reduceMotionQuery.addListener(handleReduceMotionChange);
    }

    return () => {
      if (typeof reduceMotionQuery.removeEventListener === "function") {
        reduceMotionQuery.removeEventListener("change", handleReduceMotionChange);
      } else if (typeof reduceMotionQuery.removeListener === "function") {
        reduceMotionQuery.removeListener(handleReduceMotionChange);
      }
    };
  }, []);

  const panResponder = useMemo(() => {
    if (isWide || totalProjects < 2) {
      return null;
    }

    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        shouldCaptureOrbitSwipe(gestureState),
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        shouldCaptureOrbitSwipe(gestureState),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx <= -SWIPE_TRIGGER_DISTANCE) {
          setOrbitStep((current) => current + 1);
          return;
        }

        if (gestureState.dx >= SWIPE_TRIGGER_DISTANCE) {
          setOrbitStep((current) => current - 1);
        }
      },
    });
  }, [isWide, totalProjects]);

  return (
    <View style={styles.outer}>
      <View style={styles.stickyFrame}>
        <View style={[styles.scene, !isWide && styles.sceneCompact]}>
          <View
            pointerEvents="box-none"
            style={[
              styles.orbitBackdrop,
              isWide ? styles.orbitBackdropWide : styles.orbitBackdropCompact,
            ]}
          >
            <View
              {...(!isWide && panResponder ? panResponder.panHandlers : {})}
              style={styles.orbitInteractionLayer}
            >
              <View style={styles.orbitGlow} />
              <View style={styles.orbitGlowSecondary} />

              <View
                style={[
                  styles.orbitPath,
                  isWide ? styles.orbitPathWide : styles.orbitPathCompact,
                ]}
              />

              {projects.map((project, index) => {
                const orbitCard = getOrbitCardState({
                  angle,
                  cardHeight,
                  cardWidth,
                  index,
                  isWide,
                  total: projects.length,
                });
                const theme =
                  ORBITAL_CARD_THEMES[index % ORBITAL_CARD_THEMES.length];
                const ghost = ORBITAL_CARD_GHOSTS[project.slug];
                const projectImageSource = PROJECT_IMAGE_SOURCES[project.slug];
                const isLightTheme = theme === "light";
                const isSoftTheme = theme === "soft";
                const usesLightText = theme === "dark";
                const projectGithubUrl = project.githubUrl || defaultGithubUrl;

                return (
                  <View
                    key={project.slug}
                    style={[
                      styles.orbitCardFrame,
                      {
                        width: cardWidth,
                        minHeight: cardHeight,
                        left: orbitCard.anchorLeft,
                        top: orbitCard.anchorTop,
                        zIndex: orbitCard.zIndex,
                        opacity: orbitCard.opacity,
                        transform: orbitCard.transform,
                      },
                      orbitCard.webStyle,
                      Platform.OS === "web" &&
                        !prefersReducedMotion &&
                        styles.orbitCardFrameMotion,
                    ]}
                  >
                    {projectImageSource ? (
                      <View style={styles.orbitCardFloatingBadge}>
                        <ProjectIcon color={palette.purple} slug={project.slug} />
                      </View>
                    ) : null}

                    <View
                      style={[
                        styles.orbitCardInner,
                        isLightTheme
                          ? styles.orbitCardInnerLight
                          : isSoftTheme
                            ? styles.orbitCardInnerSoft
                            : styles.orbitCardInnerDark,
                      ]}
                    >
                      <OrbitGhostArtwork
                        ghost={ghost}
                        isWide={isWide}
                        theme={theme}
                      />

                      <View style={styles.orbitCardContentLayer}>
                        <View>
                          {projectImageSource ? (
                            <View style={styles.orbitCardMediaWrap}>
                              <Image
                                source={projectImageSource}
                                style={[
                                  styles.orbitCardMediaImage,
                                  project.slug === "speed-bump" &&
                                    styles.orbitCardMediaImageSpeedBump,
                                ]}
                              />
                            </View>
                          ) : (
                            <View
                              style={[
                                styles.iconBadge,
                                isLightTheme
                                  ? styles.iconBadgeLight
                                  : isSoftTheme
                                    ? styles.iconBadgeSoft
                                    : styles.iconBadgeDark,
                              ]}
                            >
                              <ProjectIcon
                                color={
                                  isLightTheme
                                    ? palette.purple
                                    : isSoftTheme
                                      ? palette.purple
                                      : palette.pink
                                }
                                slug={project.slug}
                              />
                            </View>
                          )}

                          <View
                            style={[
                              styles.orbitCardBody,
                              projectImageSource && styles.orbitCardBodyWithMedia,
                            ]}
                          >
                            <Text
                              style={[
                                styles.orbitCardTitle,
                                usesLightText
                                  ? styles.orbitCardTitleLight
                                  : styles.orbitCardTitleDark,
                              ]}
                            >
                              {project.title}
                            </Text>
                            <Text
                              style={[
                                styles.orbitCardCopy,
                                usesLightText
                                  ? styles.orbitCardCopyLight
                                  : styles.orbitCardCopyDark,
                              ]}
                            >
                              {project.summary}
                            </Text>
                            {!projectImageSource ? (
                              <Text
                                style={[
                                  styles.orbitCardOutcome,
                                  usesLightText
                                    ? styles.orbitCardOutcomeLight
                                    : styles.orbitCardOutcomeDark,
                                ]}
                              >
                                {project.outcome}
                              </Text>
                            ) : null}
                          </View>
                        </View>

                        <View style={styles.orbitCardFooter}>
                          <View style={styles.orbitCardTagRow}>
                            <View
                              style={[
                                styles.orbitCardTagChip,
                                isLightTheme
                                  ? styles.orbitCardTagChipLight
                                  : isSoftTheme
                                    ? styles.orbitCardTagChipSoft
                                    : styles.orbitCardTagChipDark,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.orbitCardTag,
                                  isLightTheme
                                    ? styles.orbitCardTagDark
                                    : isSoftTheme
                                      ? styles.orbitCardTagSoft
                                      : styles.orbitCardTagLight,
                                ]}
                              >
                                {project.tag || project.stack[0]}
                              </Text>
                            </View>
                          </View>
                          <Pressable
                            disabled={!projectGithubUrl}
                            onPress={() => {
                              if (projectGithubUrl) {
                                Linking.openURL(projectGithubUrl);
                              }
                            }}
                            style={[
                              styles.projectLinkButton,
                              isLightTheme
                                ? styles.projectLinkButtonLight
                                : isSoftTheme
                                  ? styles.projectLinkButtonSoft
                                  : styles.projectLinkButtonDark,
                              !projectGithubUrl && styles.projectLinkButtonDisabled,
                            ]}
                          >
                            <MaterialCommunityIcons
                              color={usesLightText ? "#FFFFFF" : palette.navy}
                              name="github"
                              size={18}
                            />
                            <Text
                              style={[
                                styles.projectLinkText,
                                usesLightText
                                  ? styles.orbitCardTitleLight
                                  : styles.orbitCardTitleDark,
                              ]}
                            >
                              Code
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={[styles.overlayPanel, !isWide && styles.overlayPanelCompact]}>
            <View
              style={[
                surface,
                styles.contentCard,
                !isWide && styles.contentCardCompact,
              ]}
            >
              <View style={styles.availabilityPill}>
                <View style={styles.availabilityPulse} />
                <Text style={styles.availabilityText}>
                  AVAILABLE FOR NEW CHALLENGES
                </Text>
              </View>

              <Text style={[styles.name, !isWide && styles.nameCompact]}>
                {hero.name}
              </Text>
              <Text style={[styles.subtitle, !isWide && styles.subtitleCompact]}>
                {hero.title} |{" "}
                <Text style={styles.subtitleAccent}>MERN &amp; AI Systems</Text>
              </Text>
              <Text style={styles.summary}>{hero.summary}</Text>

              <View style={styles.chipRow}>
                {HERO_CHIPS.map((chip) => (
                  <View
                    key={chip.label}
                    style={[
                      styles.heroChip,
                      chip.tone === "dark"
                        ? styles.heroChipDark
                        : chip.tone === "purple"
                          ? styles.heroChipPurple
                          : styles.heroChipPink,
                    ]}
                  >
                    <Text
                      style={[
                        styles.heroChipText,
                        chip.tone === "dark"
                          ? styles.heroChipTextLight
                          : styles.heroChipTextDark,
                      ]}
                    >
                      {chip.label}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.ctaRow}>
                <Pressable onPress={onTalkPress} style={styles.primaryCta}>
                  <Text style={styles.primaryCtaText}>Work Together</Text>
                  <Text style={styles.primaryCtaArrow}>-&gt;</Text>
                </Pressable>

                <Pressable
                  onPress={onJourneyPress}
                  style={[styles.secondaryCta, surface]}
                >
                  <Text style={styles.secondaryCtaText}>View Journey</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {totalProjects > 1 ? (
            <OrbitControlButton
              isCompact={!isWide}
              label={
                nextProjectTitle
                  ? `Show next project: ${nextProjectTitle}`
                  : "Show next project"
              }
              onPress={() => setOrbitStep((current) => current + 1)}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

function ProjectIcon({ color, slug }) {
  const iconName = getProjectIconName(slug);

  return <MaterialCommunityIcons color={color} name={iconName} size={28} />;
}

function getWrappedIndex(value, total) {
  if (!total) {
    return 0;
  }

  return ((value % total) + total) % total;
}

function shouldCaptureOrbitSwipe(gestureState) {
  return (
    Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
    Math.abs(gestureState.dx) > SWIPE_CAPTURE_DISTANCE
  );
}

export default HeroSection;
