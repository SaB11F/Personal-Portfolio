import { Platform, StyleSheet } from "react-native";

import { fonts, palette, shadow } from "../../../lib/theme";

export const styles = StyleSheet.create({
  section: {
    position: "relative",
    alignSelf: "center",
  },
  sectionCompact: {
    alignSelf: "stretch",
  },
  viewport: {
    overflow: "visible",
  },
  trackGestureLayer: {
    ...(Platform.OS === "web"
      ? {
          cursor: "grab",
          userSelect: "none",
        }
      : {}),
  },
  trackGestureLayerDragging: {
    ...(Platform.OS === "web"
      ? {
          cursor: "grabbing",
        }
      : {}),
  },
  track: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardShell: {
    flexShrink: 0,
  },
  cardShellLifted: {
    zIndex: 2,
  },
  cardFrame: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.68)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.36)",
    ...shadow,
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(14px)",
          transitionDuration: "260ms",
          transitionProperty: "transform, box-shadow, filter",
          transitionTimingFunction: "ease-out",
        }
      : {}),
  },
  cardFrameHovered: {
    transform: [{ scale: 1.035 }],
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 26px 52px rgba(21, 23, 61, 0.16)",
        }
      : {}),
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(21, 23, 61, 0.1)",
  },
  cardInfo: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 18,
    backgroundColor: "rgba(21, 23, 61, 0.62)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(10px)",
        }
      : {}),
  },
  cardCategory: {
    color: palette.pink,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    fontFamily: fonts.display,
    marginBottom: 6,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    fontFamily: fonts.display,
  },
  lightboxRoot: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  lightboxBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(21, 23, 61, 0.9)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(20px)",
        }
      : {}),
  },
  lightboxPressZone: {
    ...StyleSheet.absoluteFillObject,
  },
  lightboxContent: {
    width: "100%",
    maxWidth: 1080,
    alignSelf: "center",
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    ...shadow,
  },
  lightboxContentCompact: {
    flexDirection: "column",
    maxWidth: 520,
  },
  lightboxMediaPane: {
    flex: 1.85,
    minHeight: 320,
    backgroundColor: palette.mist,
  },
  lightboxMediaPaneCompact: {
    minHeight: 260,
  },
  lightboxImage: {
    width: "100%",
    height: "100%",
  },
  lightboxInfoPane: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 34,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  lightboxInfoPaneCompact: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  lightboxYear: {
    color: palette.purple,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontFamily: fonts.display,
    marginBottom: 14,
  },
  lightboxTitle: {
    color: palette.navy,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -1,
    fontFamily: fonts.display,
    marginBottom: 18,
  },
  lightboxTitleCompact: {
    fontSize: 28,
    lineHeight: 32,
  },
  lightboxBody: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 26,
    fontFamily: fonts.display,
    marginBottom: 24,
  },
  lightboxMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lightboxMetaBadge: {
    width: 42,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(152, 37, 152, 0.16)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(152, 37, 152, 0.08)",
  },
  lightboxMetaCopy: {
    flex: 1,
  },
  lightboxMetaLabel: {
    color: palette.navy,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  lightboxMetaValue: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 2,
    fontFamily: fonts.display,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(21, 23, 61, 0.22)",
    zIndex: 10,
    ...(Platform.OS === "web"
      ? {
          transitionDuration: "180ms",
          transitionProperty: "background-color, transform",
          transitionTimingFunction: "ease-out",
        }
      : {}),
  },
  closeButtonHovered: {
    backgroundColor: "rgba(21, 23, 61, 0.36)",
    transform: [{ scale: 1.04 }],
  },
});
