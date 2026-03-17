import { Pressable, StyleSheet, Text, View } from "react-native";

import { fonts, palette, surface } from "../lib/theme";

const links = [
  { key: "experience", label: "Experience" },
  { key: "orbit", label: "Orbit" },
  { key: "skills", label: "Stack" },
];

function SectionNav({ isWide, onNavigate }) {
  return (
    <View style={[styles.wrapper, isWide ? styles.wrapperWide : styles.wrapperCompact, surface]}>
      <View style={styles.brandChip}>
        <View style={styles.brandMark}>
          <View style={styles.brandDot} />
        </View>
        <Text style={styles.brandText}>RK</Text>
      </View>

      <View style={[styles.linkRow, !isWide && styles.linkRowCompact]}>
        {links.map((link) => (
          <Pressable
            key={link.key}
            onPress={() => onNavigate(link.key)}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>{link.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={() => onNavigate("contact")} style={styles.ctaButton}>
        <Text style={styles.ctaText}>LET&apos;S TALK</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999
  },
  wrapperWide: {
    width: "auto",
    minWidth: 560,
    maxWidth: 660
  },
  wrapperCompact: {
    width: "100%",
    maxWidth: 430,
    gap: 10
  },
  brandChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(21, 23, 61, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.72)"
  },
  brandMark: {
    width: 16,
    height: 16,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.purple
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#FFFFFF"
  },
  brandText: {
    color: palette.navy,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.4,
    fontFamily: fonts.display
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 22,
    paddingHorizontal: 8
  },
  linkRowCompact: {
    gap: 12
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 2
  },
  linkText: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.35,
    fontFamily: fonts.display
  },
  ctaButton: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: palette.navy
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.9,
    fontFamily: fonts.display
  }
});

export default SectionNav;
