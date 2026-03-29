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
  timeline: {
    gap: 24,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 28,
  },
  timelineItemCompact: {
    flexDirection: "column",
    gap: 16,
  },
  railColumn: {
    width: 220,
    alignItems: "flex-start",
  },
  railColumnCompact: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  periodChip: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    borderWidth: 1,
  },
  periodChipFeatured: {
    backgroundColor: "rgba(152, 37, 152, 0.14)",
    borderColor: "rgba(152, 37, 152, 0.2)",
  },
  periodChipDefault: {
    backgroundColor: "rgba(21, 23, 61, 0.045)",
    borderColor: "rgba(21, 23, 61, 0.08)",
  },
  periodChipText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  periodChipTextFeatured: {
    color: palette.purple,
  },
  periodChipTextDefault: {
    color: "rgba(21, 23, 61, 0.7)",
  },
  markerColumn: {
    width: 36,
    marginTop: 18,
    marginLeft: 20,
    alignItems: "center",
    flexGrow: 1,
  },
  markerColumnCompact: {
    marginTop: 0,
    marginLeft: 0,
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 0,
  },
  roadNode: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  roadNodeFeatured: {
    borderColor: "rgba(152, 37, 152, 0.62)",
    backgroundColor: "rgba(152, 37, 152, 0.14)",
  },
  roadNodeDefault: {
    borderColor: "rgba(21, 23, 61, 0.18)",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  roadNodeCore: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.purple,
  },
  roadStem: {
    width: 2,
    flex: 1,
    minHeight: 96,
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: "rgba(21, 23, 61, 0.12)",
  },
  roadStemFeatured: {
    backgroundColor: "rgba(152, 37, 152, 0.22)",
  },
  roadStemCompact: {
    width: 52,
    height: 2,
    minHeight: 0,
    marginTop: 0,
    marginLeft: 10,
  },
  cardShell: {
    position: "relative",
    flex: 1,
  },
  cardShellCompact: {
    width: "100%",
  },
  primaryHalo: {
    position: "absolute",
    top: -16,
    right: 58,
    width: 196,
    height: 196,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.12)",
    ...(Platform.OS === "web"
      ? {
          filter: "blur(58px)",
        }
      : {}),
  },
  card: {
    position: "relative",
    overflow: "hidden",
    gap: 12,
    paddingHorizontal: 32,
    paddingVertical: 28,
    borderRadius: 30,
  },
  cardFeatured: {
    borderColor: "rgba(152, 37, 152, 0.18)",
    backgroundColor: "rgba(255, 250, 252, 0.98)",
  },
  cardDefault: {
    borderColor: "rgba(21, 23, 61, 0.08)",
    backgroundColor: "rgba(255, 250, 252, 0.94)",
  },
  cardCompact: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  cardFeaturedWeb: {
    boxShadow: "0 24px 72px rgba(152, 37, 152, 0.12)",
  },
  cardDefaultWeb: {
    boxShadow: "0 18px 52px rgba(21, 23, 61, 0.08)",
  },
  cardHeader: {
    gap: 4,
  },
  role: {
    color: palette.navy,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  company: {
    color: "rgba(21, 23, 61, 0.8)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    letterSpacing: 0.2,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  meta: {
    color: "rgba(21, 23, 61, 0.46)",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  copy: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 30,
    fontFamily: fonts.display,
  },
});
