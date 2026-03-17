import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { fonts, palette, shadow, surface } from "../lib/theme";

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
            pointerEvents="none"
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
                        <Text
                          style={[
                            styles.iconBadgeText,
                            theme === "dark"
                              ? styles.iconBadgeTextDark
                              : styles.iconBadgeTextLight,
                          ]}
                        >
                          {getProjectMonogram(project.title)}
                        </Text>
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
                      <Text
                        style={[
                          styles.orbitCardArrow,
                          theme === "dark"
                            ? styles.orbitCardTitleLight
                            : styles.orbitCardTitleDark,
                        ]}
                      >
                        ->
                      </Text>
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
            <Text style={styles.summary}>
              Builder of real products, APIs, AI assistants, and applied
              software systems. Merging hardware logic with modern web scale.
            </Text>

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

              <Pressable onPress={onJourneyPress} style={[styles.secondaryCta, surface]}>
                <Text style={styles.secondaryCtaText}>View Journey</Text>
              </Pressable>
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

function getProjectMonogram(title) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const styles = StyleSheet.create({
  outer: {
    width: "100%",
  },
  stickyFrame: {
    justifyContent: "center",
    paddingTop: 34,
    paddingBottom: 34,
  },
  scene: {
    position: "relative",
    minHeight: 930,
    justifyContent: "center",
  },
  sceneCompact: {
    minHeight: 1080,
    justifyContent: "flex-start",
    paddingTop: 26,
  },
  orbitBackdrop: {
    ...StyleSheet.absoluteFillObject,
    overflow: "visible",
  },
  orbitBackdropWide: {
    top: -54,
    bottom: 54,
  },
  orbitBackdropCompact: {
    top: 200,
  },
  orbitGlow: {
    position: "absolute",
    right: -40,
    top: -56,
    width: 900,
    height: 900,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.08)",
  },
  orbitGlowSecondary: {
    position: "absolute",
    right: 190,
    top: 74,
    width: 430,
    height: 430,
    borderRadius: 999,
    backgroundColor: "rgba(228, 145, 201, 0.06)",
  },
  orbitPath: {
    position: "absolute",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(152, 37, 152, 0.2)",
    borderRadius: 999,
    opacity: 0.42,
    transform: [{ rotate: "15deg" }],
  },
  orbitPathWide: {
    width: 1140,
    height: 590,
    left: "75%",
    top: "48%",
    marginLeft: -570,
    marginTop: -295,
  },
  orbitPathCompact: {
    width: 800,
    height: 390,
    left: "56%",
    top: "58%",
    marginLeft: -400,
    marginTop: -195,
  },
  overlayPanel: {
    position: "relative",
    zIndex: 20,
    width: "100%",
    maxWidth: 540,
    paddingTop: 28,
    paddingBottom: 32,
  },
  overlayPanelCompact: {
    maxWidth: "100%",
    paddingRight: 14,
  },
  availabilityPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.1)",
    marginBottom: 30,
  },
  availabilityPulse: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: palette.purple,
    borderWidth: 2,
    borderColor: "rgba(152, 37, 152, 0.14)",
  },
  availabilityText: {
    color: palette.purple,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.9,
    fontFamily: fonts.display,
  },
  name: {
    color: palette.navy,
    fontSize: 72,
    lineHeight: 74,
    fontWeight: "900",
    letterSpacing: -3,
    fontFamily: fonts.display,
  },
  nameCompact: {
    fontSize: 50,
    lineHeight: 52,
    letterSpacing: -2.1,
  },
  subtitle: {
    marginTop: 8,
    color: "rgba(21, 23, 61, 0.82)",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "500",
    fontFamily: fonts.display,
  },
  subtitleCompact: {
    fontSize: 19,
    lineHeight: 28,
  },
  subtitleAccent: {
    color: palette.purple,
    fontWeight: "700",
    fontFamily: fonts.display,
  },
  summary: {
    marginTop: 14,
    maxWidth: 520,
    color: palette.muted,
    fontSize: 15,
    lineHeight: 27,
    fontFamily: fonts.display,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  heroChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  heroChipDark: {
    backgroundColor: palette.navy,
  },
  heroChipPurple: {
    backgroundColor: "rgba(152, 37, 152, 0.18)",
  },
  heroChipPink: {
    backgroundColor: "rgba(228, 145, 201, 0.22)",
  },
  heroChipText: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  heroChipTextLight: {
    color: "#FFFFFF",
  },
  heroChipTextDark: {
    color: palette.navy,
  },
  ctaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 28,
  },
  primaryCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 18,
    backgroundColor: palette.navy,
  },
  primaryCtaText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  primaryCtaArrow: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    fontFamily: fonts.display,
  },
  secondaryCta: {
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 18,
  },
  secondaryCtaText: {
    color: palette.navy,
    fontSize: 13,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  orbitCardFrame: {
    position: "absolute",
    padding: 5,
    borderRadius: 34,
    backgroundColor: "rgba(255,255,255,0.66)",
    borderWidth: 1,
    borderColor: "rgba(152, 37, 152, 0.08)",
    ...shadow,
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(12px)",
        }
      : {}),
  },
  orbitCardInner: {
    flex: 1,
    justifyContent: "space-between",
    padding: 30,
    borderRadius: 29,
  },
  orbitCardInnerDark: {
    backgroundColor: palette.navy,
  },
  orbitCardInnerLight: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 1,
    borderColor: "rgba(21,23,61,0.08)",
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBadgeDark: {
    backgroundColor: "rgba(152, 37, 152, 0.2)",
  },
  iconBadgeLight: {
    backgroundColor: "rgba(152, 37, 152, 0.12)",
  },
  iconBadgeText: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.8,
    fontFamily: fonts.display,
  },
  iconBadgeTextDark: {
    color: palette.pink,
  },
  iconBadgeTextLight: {
    color: palette.purple,
  },
  orbitCardBody: {
    marginTop: 24,
    gap: 16,
  },
  orbitCardTitle: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: "900",
    fontFamily: fonts.display,
  },
  orbitCardTitleLight: {
    color: "#FFFFFF",
  },
  orbitCardTitleDark: {
    color: palette.navy,
  },
  orbitCardCopy: {
    fontSize: 15,
    lineHeight: 28,
    fontWeight: "500",
    fontFamily: fonts.display,
  },
  orbitCardCopyLight: {
    color: "rgba(255,255,255,0.72)",
  },
  orbitCardCopyDark: {
    color: palette.muted,
  },
  orbitCardOutcome: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: fonts.display,
  },
  orbitCardOutcomeLight: {
    color: "rgba(255,255,255,0.9)",
  },
  orbitCardOutcomeDark: {
    color: palette.navy,
  },
  orbitCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  orbitCardTag: {
    flex: 1,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  orbitCardTagLight: {
    color: palette.pink,
  },
  orbitCardTagDark: {
    color: palette.purple,
  },
  orbitCardArrow: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: fonts.display,
  },
});

export default HeroSection;
