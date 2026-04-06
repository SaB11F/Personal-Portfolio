import { Platform, StyleSheet } from "react-native";

import { fonts, palette, shadow } from "../../../lib/theme";

export const styles = StyleSheet.create({
  section: {
    gap: 34,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    gap: 14,
  },
  heading: {
    color: palette.navy,
    fontSize: 44,
    lineHeight: 48,
    fontWeight: "900",
    letterSpacing: -1.6,
    fontFamily: fonts.display,
    textAlign: "center",
  },
  headingAccent: {
    width: 96,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.18)",
  },
  gridWrap: {
    width: "100%",
    maxWidth: 1140,
    position: "relative",
  },
  connectorLine: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    height: 1,
    backgroundColor: "rgba(152, 37, 152, 0.22)",
    opacity: Platform.OS === "web" ? 1 : 0,
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
  },
  card: {
    width: "100%",
    maxWidth: 348,
    minHeight: 408,
    paddingHorizontal: 30,
    paddingVertical: 32,
    borderRadius: 28,
    backgroundColor: "rgba(255, 251, 253, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    gap: 24,
    ...shadow,
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(12px)",
          transitionDuration: "260ms",
          transitionProperty: "transform, box-shadow, border-color",
          transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        }
      : {}),
  },
  cardTablet: {
    width: "46%",
    minHeight: 0,
  },
  cardPhone: {
    maxWidth: "100%",
    minHeight: 0,
    width: "100%",
  },
  cardDelayed: {
    ...(Platform.OS === "web"
      ? {
          transform: [{ translateY: 6 }],
        }
      : {}),
  },
  cardDelayedMore: {
    ...(Platform.OS === "web"
      ? {
          transform: [{ translateY: 12 }],
        }
      : {}),
  },
  cardHover: {
    ...(Platform.OS === "web"
      ? {
          transform: [{ translateY: -10 }],
          boxShadow: "0 28px 56px rgba(152, 37, 152, 0.16)",
          borderColor: "rgba(152, 37, 152, 0.18)",
        }
      : {
          transform: [{ translateY: -6 }],
        }),
  },
  iconTile: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconTilePurple: {
    backgroundColor: "rgba(152, 37, 152, 0.12)",
  },
  iconTileNavy: {
    backgroundColor: "rgba(21, 23, 61, 0.08)",
  },
  iconTilePink: {
    backgroundColor: "rgba(228, 145, 201, 0.22)",
  },
  titleBlock: {
    gap: 8,
  },
  phase: {
    color: "rgba(152, 37, 152, 0.62)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 3.2,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  school: {
    color: palette.navy,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.8,
    fontFamily: fonts.display,
  },
  body: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "500",
    fontFamily: fonts.display,
  },
  tagRow: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tagDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  tagDotPurple: {
    backgroundColor: palette.purple,
  },
  tagDotNavy: {
    backgroundColor: palette.navy,
  },
  tagDotPink: {
    backgroundColor: palette.pink,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  tagTextPurple: {
    color: palette.purple,
  },
  tagTextNavy: {
    color: palette.navy,
  },
  tagTextPink: {
    color: "rgba(152, 37, 152, 0.84)",
  },
});
