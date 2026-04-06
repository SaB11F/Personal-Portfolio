import { memo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import { AppIcon } from "../common";
import { styles } from "./SectionNav.style";

const links = [
  { key: "orbit", label: "Orbit" },
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Stack" },
  { key: "education", label: "Education" },
];

function SectionNav({ isWide, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavPress = (key) => {
    setMenuOpen(false);
    onNavigate(key);
  };

  return (
    <View style={[styles.wrapper, !isWide && styles.wrapperCompact]}>
      <View style={styles.brandRow}>
        {!isWide ? (
          <Pressable
            accessibilityLabel="Open navigation menu"
            onPress={() => setMenuOpen(true)}
            style={styles.hamburgerBtn}
          >
            <AppIcon color="rgba(152, 37, 152, 0.9)" name="menu" size={22} />
          </Pressable>
        ) : (
          <View style={styles.avatarGroup}>
            <View style={styles.avatarShell}>
              <View style={styles.avatarInner}>
                <AppIcon
                  color="rgba(21, 23, 61, 0.35)"
                  name="account"
                  size={16}
                />
              </View>
            </View>
            <View style={styles.avatarGlow} />
          </View>
        )}

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
        <AppIcon color="#FFFFFF" name="arrow-right" size={14} />
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
        transparent
        visible={menuOpen}
      >
        <Pressable onPress={() => setMenuOpen(false)} style={styles.menuOverlay}>
          <View style={styles.menuSheet}>
            {links.map((link, index) => (
              <View key={link.key}>
                {index > 0 ? <View style={styles.menuDivider} /> : null}
                <Pressable
                  onPress={() => handleNavPress(link.key)}
                  style={styles.menuLink}
                >
                  <Text style={styles.menuLinkText}>{link.label}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default memo(SectionNav);
