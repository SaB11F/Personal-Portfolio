import { Platform, StyleSheet } from "react-native";

import { fonts, palette } from "../../../lib/theme";

export const styles = StyleSheet.create({
  section: {
    gap: 34,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  headingLine: {
    width: 48,
    height: 1,
    backgroundColor: palette.purple,
  },
  heading: {
    color: palette.navy,
    fontSize: 20,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  stack: {
    gap: 20,
  },
  cardShell: {
    position: "relative",
  },
  cardGlow: {
    position: "absolute",
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
    borderRadius: 36,
    backgroundColor: "rgba(152, 37, 152, 0.12)",
    ...(Platform.OS === "web"
      ? {
          filter: "blur(30px)",
        }
      : {}),
  },
  card: {
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    gap: 28,
    paddingHorizontal: 30,
    paddingVertical: 28,
    borderRadius: 30,
  },
  cardFocused: {
    opacity: 1,
  },
  cardMuted: {
    opacity: 0.82,
  },
  primaryHalo: {
    position: "absolute",
    right: -48,
    top: -48,
    width: 128,
    height: 128,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.18)",
  },
  cardDateColumn: {
    width: 210,
  },
  cardDate: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: fonts.display,
  },
  cardDatePrimary: {
    color: palette.purple,
  },
  cardDateMuted: {
    color: "rgba(21, 23, 61, 0.58)",
  },
  company: {
    marginTop: 7,
    color: "rgba(21, 23, 61, 0.78)",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    fontFamily: fonts.display,
  },
  meta: {
    marginTop: 4,
    color: "rgba(21, 23, 61, 0.42)",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.display,
  },
  cardContent: {
    flex: 1,
  },
  role: {
    color: palette.navy,
    fontSize: 26,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  copy: {
    marginTop: 10,
    color: palette.muted,
    fontSize: 14,
    lineHeight: 24,
    fontStyle: "italic",
    fontFamily: fonts.display,
  },
});
