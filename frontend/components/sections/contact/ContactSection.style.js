import { StyleSheet } from "react-native";

import { fonts, palette } from "../../../lib/theme";

export const styles = StyleSheet.create({
  shell: {
    overflow: "hidden",
    position: "relative",
    paddingHorizontal: 22,
    paddingVertical: 26,
    borderRadius: 44,
    backgroundColor: palette.navy,
  },
  patternLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  layout: {
    flexDirection: "row",
    gap: 28,
  },
  layoutCompact: {
    flexDirection: "column",
  },
  infoColumn: {
    flex: 1,
    gap: 18,
    paddingHorizontal: 2,
    paddingVertical: 6,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 56,
    lineHeight: 58,
    fontWeight: "900",
    letterSpacing: -2,
    fontFamily: fonts.display,
  },
  copy: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    lineHeight: 28,
    maxWidth: 430,
    fontFamily: fonts.display,
  },
  contactList: {
    gap: 18,
    marginTop: 8,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIconLine: {
    position: "absolute",
    width: 14,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    opacity: 0.88,
  },
  contactIconDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  contactTextColumn: {
    gap: 3,
  },
  contactLabel: {
    color: "rgba(255,255,255,0.42)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  contactValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fonts.display,
  },
  formCard: {
    width: "100%",
    maxWidth: 382,
    padding: 22,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.06)",
    gap: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowCompact: {
    flexDirection: "column",
  },
  fieldShell: {
    flex: 1,
    gap: 6,
  },
  fieldLabel: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  fieldInput: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontFamily: fonts.display,
  },
  fieldInputMultiline: {
    minHeight: 118,
    textAlignVertical: "top",
  },
  messageField: {
    minHeight: 128,
  },
  submitButton: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: palette.purple,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  submitArrow: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    fontFamily: fonts.display,
  },
  statusText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: fonts.display,
  },
  statusTextWarning: {
    color: "rgba(255, 211, 125, 0.96)",
  },
  statusTextError: {
    color: palette.pink,
  },
});
