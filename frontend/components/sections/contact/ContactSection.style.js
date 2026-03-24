import { StyleSheet } from "react-native";

import { fonts, palette } from "../../../lib/theme";

export const styles = StyleSheet.create({
  shell: {
    overflow: "hidden",
    position: "relative",
    paddingHorizontal: 28,
    paddingVertical: 34,
    borderRadius: 42,
    backgroundColor: palette.navy,
  },
  patternLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.34,
  },
  layout: {
    flexDirection: "row",
    gap: 46,
  },
  layoutCompact: {
    flexDirection: "column",
    gap: 28,
  },
  infoColumn: {
    flex: 1,
    gap: 22,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 54,
    lineHeight: 56,
    fontWeight: "900",
    letterSpacing: -2.4,
    fontFamily: fonts.display,
    maxWidth: 360,
  },
  copy: {
    color: "rgba(223,229,255,0.72)",
    fontSize: 17,
    lineHeight: 30,
    maxWidth: 480,
    fontFamily: fonts.display,
  },
  contactList: {
    gap: 24,
    marginTop: 12,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  contactTextColumn: {
    gap: 4,
  },
  contactLabel: {
    color: "rgba(203, 210, 235, 0.62)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  contactValue: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 24,
    fontFamily: fonts.display,
  },
  formCard: {
    width: "100%",
    maxWidth: 560,
    paddingHorizontal: 28,
    paddingVertical: 30,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.055)",
    gap: 10,
    ...(globalThis?.navigator
      ? {
          backdropFilter: "blur(14px)",
        }
      : {}),
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  rowCompact: {
    flexDirection: "column",
  },
  fieldShell: {
    gap: 8,
  },
  rowFieldShell: {
    flex: 1,
  },
  fieldLabel: {
    color: "rgba(203, 210, 235, 0.7)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  fieldInput: {
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.045)",
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: fonts.display,
  },
  fieldInputMultiline: {
    minHeight: 168,
    textAlignVertical: "top",
  },
  messageField: {
    minHeight: 168,
    maxHeight: 288,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 22,
    marginBottom: 18,
  },
  messageFieldWeb: {
    resize: "vertical",
    overflow: "auto",
  },
  submitButton: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 18,
    backgroundColor: palette.purple,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
    fontFamily: fonts.display,
  },
  submitIcon: {
    opacity: 0.96,
  },
  statusText: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    fontFamily: fonts.display,
    marginTop: 6,
  },
  statusTextWarning: {
    color: "rgba(255, 211, 125, 0.96)",
  },
  statusTextError: {
    color: palette.pink,
  },
});
