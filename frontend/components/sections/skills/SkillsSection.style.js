import { Platform, StyleSheet } from "react-native";

import { fonts, palette } from "../../../lib/theme";

export const styles = StyleSheet.create({
  shell: {
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 58,
    paddingVertical: 58,
    borderRadius: 56,
    backgroundColor: "rgba(255, 251, 253, 0.8)",
    borderColor: "rgba(255, 255, 255, 0.34)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(14px)",
          boxShadow: "0 34px 96px rgba(21, 23, 61, 0.08)",
        }
      : {}),
  },
  shellCompact: {
    paddingHorizontal: 28,
    paddingVertical: 32,
    borderRadius: 38,
  },
  shellPhone: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    borderRadius: 30,
  },
  ambientGlow: {
    position: "absolute",
    left: -40,
    bottom: -52,
    width: 280,
    height: 200,
    borderRadius: 999,
    backgroundColor: "rgba(228, 145, 201, 0.08)",
  },
  ambientGlowSecondary: {
    position: "absolute",
    right: 74,
    top: 82,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.03)",
  },
  abstractBlobLeft: {
    position: "absolute",
    left: -80,
    bottom: -72,
    width: 260,
    height: 210,
    borderRadius: 999,
    backgroundColor: "rgba(228, 145, 201, 0.12)",
  },
  abstractBlobRight: {
    position: "absolute",
    right: 110,
    top: 112,
    width: 170,
    height: 124,
    borderRadius: 36,
    backgroundColor: "rgba(152, 37, 152, 0.04)",
    transform: [{ rotate: "14deg" }],
  },
  abstractRing: {
    position: "absolute",
    right: 18,
    top: 168,
    width: 126,
    height: 126,
    borderRadius: 999,
    borderWidth: 18,
    borderColor: "rgba(228, 145, 201, 0.08)",
  },
  dotCluster: {
    position: "absolute",
    right: 28,
    top: 58,
    width: 238,
    height: 122,
  },
  dot: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(21, 23, 61, 0.12)",
  },
  layout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 48,
  },
  layoutCompact: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 28,
  },
  leftColumn: {
    flex: 1,
    gap: 18,
    paddingTop: 8,
  },
  leftColumnCompact: {
    maxWidth: "100%",
    paddingTop: 0,
  },
  headerBlock: {
    gap: 12,
  },
  eyebrow: {
    color: "rgba(152, 37, 152, 0.62)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  headingAccent: {
    width: 88,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.16)",
  },
  heading: {
    color: palette.navy,
    fontSize: 50,
    lineHeight: 54,
    fontWeight: "900",
    letterSpacing: -2.2,
    fontFamily: fonts.display,
  },
  headingCompact: {
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: -1.6,
  },
  headingPhone: {
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -1,
    fontFamily: fonts.display,
  },
  copy: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 28,
    maxWidth: 560,
    fontFamily: fonts.display,
  },
  copyCompact: {
    fontSize: 15,
    lineHeight: 28,
    maxWidth: "100%",
  },
  copyPhone: {
    fontSize: 14,
    lineHeight: 24,
  },
  networkPanel: {
    marginTop: 20,
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 22,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.48)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(8px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65)",
        }
      : {}),
  },
  networkPanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  networkPanelTitle: {
    color: palette.navy,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: -0.2,
    fontFamily: fonts.display,
  },
  networkPanelMeta: {
    color: "rgba(106, 98, 128, 0.78)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  networkStage: {
    position: "relative",
    width: 508,
    height: 172,
  },
  connectionLine: {
    position: "absolute",
    height: 2,
    borderRadius: 999,
  },
  nodeWrap: {
    position: "absolute",
  },
  mobileChipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  mobileChipWrapPhone: {
    gap: 8,
  },
  skillChip: {
    minHeight: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    borderWidth: 1,
  },
  skillChipCompact: {
    minHeight: 40,
    paddingHorizontal: 15,
  },
  skillChipTransition: {
    transitionDuration: "220ms",
    transitionProperty: "transform, box-shadow, border-color, background-color",
    transitionTimingFunction: "ease-out",
  },
  skillChipHovered: {
    transform: [{ scale: 1.04 }, { translateY: -2 }],
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 14px 28px rgba(152, 37, 152, 0.12)",
        }
      : {}),
  },
  skillChipDark: {
    backgroundColor: palette.navy,
    borderColor: "rgba(21, 23, 61, 0.04)",
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 12px 26px rgba(21, 23, 61, 0.08)",
        }
      : {}),
  },
  skillChipPurple: {
    backgroundColor: "rgba(152, 37, 152, 0.12)",
    borderColor: "rgba(152, 37, 152, 0.08)",
  },
  skillChipPink: {
    backgroundColor: "rgba(228, 145, 201, 0.16)",
    borderColor: "rgba(228, 145, 201, 0.18)",
  },
  skillChipSoft: {
    backgroundColor: "rgba(241, 233, 233, 0.88)",
    borderColor: "rgba(21, 23, 61, 0.06)",
  },
  skillChipText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.2,
    fontFamily: fonts.display,
  },
  skillChipTextCompact: {
    fontSize: 10,
  },
  skillChipTextLight: {
    color: "#FFFFFF",
  },
  skillChipTextPurple: {
    color: "#6F257A",
  },
  skillChipTextDark: {
    color: palette.navy,
  },
  cardsStage: {
    width: 520,
    minHeight: 392,
    flexShrink: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: 18,
    paddingTop: 10,
  },
  cardsStageCompact: {
    width: "100%",
    minHeight: 0,
    gap: 14,
    marginTop: 2,
  },
  cardsStageSingleColumn: {
    flexDirection: "column",
  },
  featureCard: {
    overflow: "hidden",
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 22,
    borderRadius: 28,
    borderWidth: 1,
    ...(Platform.OS === "web"
      ? {
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.24)",
        }
      : {}),
  },
  featureCardWide: {
    position: "relative",
  },
  featureCardCompact: {
    width: "48%",
    minHeight: 158,
  },
  featureCardSingleColumn: {
    width: "100%",
    minHeight: 148,
  },
  featureIconTile: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    marginTop: 16,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  featureText: {
    marginTop: 8,
    fontSize: 11,
    lineHeight: 18,
    opacity: 0.86,
    fontFamily: fonts.display,
  },
});
