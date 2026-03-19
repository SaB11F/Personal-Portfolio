import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Platform, Pressable, Text, View } from "react-native";

import { palette, surface } from "../../../lib/theme";
import { HERO_CHIPS, ORBITAL_CARD_THEMES } from "./HeroSection.constants";
import { getOrbitCardState, getProjectIconName } from "./HeroSection.helpers";
import { styles } from "./HeroSection.style";

function HeroSection({
  hero,
  isWide,
  metrics: _metrics,
  onJourneyPress,
  onTalkPress,
  progress,
  projects,
  sectionHeight,
  viewportHeight,
}) {
  const angle = progress * 360;
  const contentShift = progress * (isWide ? 12 : 6);
  const cardWidth = isWide ? 468 : 262;
  const cardHeight = isWide ? 572 : 324;
  const defaultGithubUrl =
    hero.ctas.find((cta) => cta.label.toLowerCase() === "github")?.href || null;

  return (
    <View style={[styles.outer, { height: sectionHeight }]}>
      <View
        style={[
          styles.stickyFrame,
          { minHeight: viewportHeight },
          Platform.OS === "web"
            ? {
                position: "sticky",
                top: 0,
                height: viewportHeight,
              }
            : null,
        ]}
      >
        <View style={[styles.scene, !isWide && styles.sceneCompact]}>
          <View
            pointerEvents="box-none"
            style={[
              styles.orbitBackdrop,
              isWide ? styles.orbitBackdropWide : styles.orbitBackdropCompact,
            ]}
          >
            <View
              style={[
                styles.orbitGlow,
                {
                  opacity: 0.18 + progress * 0.08,
                },
              ]}
            />
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
                  ]}
                >
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
                    <View>
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

                      <View style={styles.orbitCardBody}>
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
                      </View>
                    </View>

                    <View style={styles.orbitCardFooter}>
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
                        {project.stack.slice(0, 2).join(" + ")}
                      </Text>
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
              );
            })}
          </View>

          <View
            style={[
              styles.overlayPanel,
              !isWide && styles.overlayPanelCompact,
              {
                transform: [{ translateY: contentShift }],
              },
            ]}
          >
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
                  <Text style={styles.primaryCtaArrow}>-></Text>
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
        </View>
      </View>
    </View>
  );
}

function ProjectIcon({ color, slug }) {
  const iconName = getProjectIconName(slug);

  return <MaterialCommunityIcons color={color} name={iconName} size={28} />;
}

export default HeroSection;
