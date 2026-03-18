import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Platform, Pressable, Text, View } from "react-native";

import { palette, surface } from "../../../lib/theme";
import { styles } from "./HeroSection.style";

const orbitalCardThemes = ["dark", "light", "dark", "light"];

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
              const theme = orbitalCardThemes[index % orbitalCardThemes.length];
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
                      theme === "dark"
                        ? styles.orbitCardInnerDark
                        : styles.orbitCardInnerLight,
                    ]}
                  >
                    <View>
                      <View
                        style={[
                          styles.iconBadge,
                          theme === "dark"
                            ? styles.iconBadgeDark
                            : styles.iconBadgeLight,
                        ]}
                      >
                        <ProjectIcon
                          color={
                            theme === "dark" ? palette.pink : palette.purple
                          }
                          slug={project.slug}
                        />
                      </View>

                      <View style={styles.orbitCardBody}>
                        <Text
                          style={[
                            styles.orbitCardTitle,
                            theme === "dark"
                              ? styles.orbitCardTitleLight
                              : styles.orbitCardTitleDark,
                          ]}
                        >
                          {project.title}
                        </Text>
                        <Text
                          style={[
                            styles.orbitCardCopy,
                            theme === "dark"
                              ? styles.orbitCardCopyLight
                              : styles.orbitCardCopyDark,
                          ]}
                        >
                          {project.summary}
                        </Text>
                        <Text
                          style={[
                            styles.orbitCardOutcome,
                            theme === "dark"
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
                          theme === "dark"
                            ? styles.orbitCardTagLight
                            : styles.orbitCardTagDark,
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
                          theme === "dark"
                            ? styles.projectLinkButtonDark
                            : styles.projectLinkButtonLight,
                          !projectGithubUrl && styles.projectLinkButtonDisabled,
                        ]}
                      >
                        <MaterialCommunityIcons
                          color={theme === "dark" ? "#FFFFFF" : palette.navy}
                          name="github"
                          size={18}
                        />
                        <Text
                          style={[
                            styles.projectLinkText,
                            theme === "dark"
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
                {["React", "Node.js", "AI Systems", "RAG", "MERN Stack"].map(
                  (item, index) => (
                    <View
                      key={item}
                      style={[
                        styles.heroChip,
                        index < 2
                          ? styles.heroChipDark
                          : index < 4
                            ? styles.heroChipPurple
                            : styles.heroChipPink,
                      ]}
                    >
                      <Text
                        style={[
                          styles.heroChipText,
                          index < 2
                            ? styles.heroChipTextLight
                            : styles.heroChipTextDark,
                        ]}
                      >
                        {item}
                      </Text>
                    </View>
                  )
                )}
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

function getOrbitCardState({
  angle,
  cardHeight,
  cardWidth,
  index,
  isWide,
  total,
}) {
  const theta = (index * (360 / total) + angle) * (Math.PI / 180);
  const radiusX = isWide ? 482 : 188;
  const radiusY = isWide ? 224 : 142;
  const x = Math.sin(theta) * radiusX;
  const y = Math.cos(theta) * radiusY * 0.5;
  const z = Math.cos(theta) * 400;
  const scale = (z + 600) / 1000;
  const blur = Math.max(0, (400 - z) / 100);

  return {
    anchorLeft: isWide ? "74%" : "56%",
    anchorTop: isWide ? "50%" : "67%",
    opacity: Math.max(0.16, (z + 500) / 900),
    transform: [
      { perspective: 1200 },
      { translateX: x - cardWidth / 2 },
      { translateY: y - cardHeight / 2 },
      { scale },
      { rotate: `${Math.sin(theta) * -3}deg` },
      { rotateY: `${Math.sin(theta) * -15}deg` },
    ],
    webStyle:
      Platform.OS === "web"
        ? {
            filter: z < 0 ? `blur(${blur}px)` : "blur(0px)",
          }
        : {},
    zIndex: Math.round(z + 500),
  };
}

function ProjectIcon({ color, slug }) {
  const iconName = getProjectIconName(slug);

  return <MaterialCommunityIcons color={color} name={iconName} size={28} />;
}

function getProjectIconName(slug) {
  switch (slug) {
    case "rag-assistant":
      return "head-cog-outline";
    case "fogponic-system":
      return "leaf";
    case "sopkomat":
      return "cash-register";
    case "speed-bump":
      return "traffic-light-outline";
    default:
      return "shape-outline";
  }
}

export default HeroSection;
