import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { styles } from "./SectionNav.style";

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

export default SectionNav;
