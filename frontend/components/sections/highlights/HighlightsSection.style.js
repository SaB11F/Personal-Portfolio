import { StyleSheet } from "react-native";

import { fonts, palette } from "../../../lib/theme";

export const styles = StyleSheet.create({
  section: {
    gap: 28,
    alignItems: "center",
  },
  heading: {
    color: palette.navy,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2.2,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  grid: {
    width: "100%",
    maxWidth: 840,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 28,
  },
  item: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 380,
    gap: 14,
  },
  iconStub: {
    marginTop: 6,
    width: 18,
    alignItems: "center",
  },
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.purple,
  },
  copyColumn: {
    flex: 1,
    gap: 5,
  },
  title: {
    color: palette.navy,
    fontSize: 16,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  body: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 22,
    fontFamily: fonts.display,
  },
});
