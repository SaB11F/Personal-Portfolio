import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { fonts, palette } from "../lib/theme";

const links = [
  { key: "experience", label: "Experience" },
  { key: "orbit", label: "Orbit" },
  { key: "skills", label: "Stack" },
];

function SectionNav({ isWide, onNavigate }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.brandRow}>
        <View style={styles.avatarGroup}>
          <View style={styles.avatarShell}>
            <View style={styles.avatarInner}>
              <MaterialCommunityIcons
                color="rgba(21, 23, 61, 0.35)"
                name="account"
                size={16}
              />
            </View>
          </View>
          <View style={styles.avatarGlow} />
        </View>

        <Text style={styles.brandText}>
          RK <Text style={styles.brandDot}>.</Text>
        </Text>
      </View>

      {isWide ? (
        <View style={styles.linkRow}>
          {links.map((link) => (
            <Pressable
              key={link.key}
              onPress={() => onNavigate(link.key)}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>{link.label}</Text>
              <View style={styles.linkUnderline} />
            </Pressable>
          ))}
        </View>
      ) : null}

      <Pressable onPress={() => onNavigate("contact")} style={styles.ctaButton}>
        <Text style={styles.ctaText}>LET&apos;S TALK</Text>
        <MaterialCommunityIcons color="#FFFFFF" name="arrow-right" size={14} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    maxWidth: 1240,
    alignSelf: "center",
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingHorizontal: 24,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatarGroup: {
    position: "relative",
  },
  avatarShell: {
    width: 40,
    height: 40,
    padding: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(152, 37, 152, 0.18)",
    backgroundColor: "rgba(255,255,255,0.4)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(10px)",
        }
      : {}),
  },
  avatarInner: {
    flex: 1,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4E7ED",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  avatarGlow: {
    position: "absolute",
    inset: -4,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.12)",
    opacity: 0.35,
    zIndex: -1,
  },
  brandText: {
    color: palette.navy,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.8,
    fontFamily: fonts.display,
  },
  brandDot: {
    color: palette.purple,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 38,
    marginLeft: "auto",
    marginRight: 12,
  },
  linkButton: {
    alignItems: "center",
    gap: 6,
  },
  linkText: {
    color: "rgba(21, 23, 61, 0.58)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2.4,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  linkUnderline: {
    width: 18,
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.18)",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: palette.purple,
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 14px 32px rgba(152, 37, 152, 0.2)",
        }
      : {}),
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
    fontFamily: fonts.display,
  },
});

export default SectionNav;
