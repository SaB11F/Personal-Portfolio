import { Platform, StyleSheet } from "react-native";

import { fonts, palette, shadow } from "../../../lib/theme";

export const styles = StyleSheet.create({
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
  contentCard: {
    width: "100%",
    maxWidth: 620,
    paddingHorizontal: 30,
    paddingVertical: 28,
    borderRadius: 38,
    backgroundColor: "rgba(255, 255, 255, 0.42)",
    borderColor: "rgba(255, 255, 255, 0.28)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(20px)",
          boxShadow: "0 18px 44px rgba(21, 23, 61, 0.08)",
        }
      : {}),
  },
  contentCardCompact: {
    paddingHorizontal: 22,
    paddingVertical: 22,
    borderRadius: 30,
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
    marginTop: 18,
    color: palette.muted,
    fontSize: 15,
    lineHeight: 27,
    fontFamily: fonts.display,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 22,
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
  orbitCardInnerSoft: {
    backgroundColor: "rgba(228, 145, 201, 0.28)",
    borderWidth: 1,
    borderColor: "rgba(152, 37, 152, 0.12)",
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
  iconBadgeSoft: {
    backgroundColor: "rgba(152, 37, 152, 0.14)",
  },
  iconBadgeLight: {
    backgroundColor: "rgba(152, 37, 152, 0.12)",
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
  orbitCardTagSoft: {
    color: palette.purple,
  },
  orbitCardTagDark: {
    color: palette.purple,
  },
  projectLinkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  projectLinkButtonDark: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.12)",
  },
  projectLinkButtonSoft: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderColor: "rgba(152, 37, 152, 0.14)",
  },
  projectLinkButtonLight: {
    backgroundColor: "rgba(21,23,61,0.04)",
    borderColor: "rgba(21,23,61,0.08)",
  },
  projectLinkButtonDisabled: {
    opacity: 0.45,
  },
  projectLinkText: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
});
