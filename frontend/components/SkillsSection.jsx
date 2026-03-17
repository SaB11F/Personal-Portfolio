import { Platform, StyleSheet, Text, View } from "react-native";

import { fonts, palette, surface } from "../lib/theme";

const cardThemes = [
  {
    accent: "AI",
    backgroundColor: palette.purple,
    color: "#FFFFFF",
    rotate: "3deg",
  },
  {
    accent: "FS",
    backgroundColor: palette.navy,
    color: "#FFFFFF",
    rotate: "-2deg",
  },
  {
    accent: "EM",
    backgroundColor: palette.pink,
    color: palette.navy,
    rotate: "-1deg",
  },
  {
    accent: "DP",
    backgroundColor: palette.mist,
    color: palette.navy,
    rotate: "5deg",
  },
];

function SkillsSection({ isWide, skills }) {
  const featuredSkills = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "OpenAI API",
    "LangChain",
    "RAG",
    "PostgreSQL",
    "Pinecone",
    "Docker",
    "Render",
  ];

  return (
    <View style={[styles.shell, surface]}>
      <View style={styles.ambientBlur} />
      <View style={styles.dotField} />

      <View style={[styles.layout, !isWide && styles.layoutCompact]}>
        <View style={styles.leftColumn}>
          <Text style={styles.heading}>Technical Constellation</Text>
          <Text style={styles.copy}>
            A carefully selected stack for building scalable, intelligent, and
            real-time software solutions.
          </Text>

          <View style={styles.chipWrap}>
            {featuredSkills.map((skill, index) => (
              <View
                key={skill}
                style={[
                  styles.skillChip,
                  index < 4
                    ? styles.skillChipDark
                    : index < 7
                      ? styles.skillChipPurple
                      : index < 9
                        ? styles.skillChipPink
                        : styles.skillChipSoft,
                ]}
              >
                <Text
                  style={[
                    styles.skillChipText,
                    index < 4
                      ? styles.skillChipTextLight
                      : styles.skillChipTextDark,
                  ]}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cardsGrid}>
          {skills.map((skill, index) => {
            const theme = cardThemes[index % cardThemes.length];

            return (
              <View
                key={skill.group}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: theme.backgroundColor,
                    transform: [{ rotate: theme.rotate }],
                    marginTop: index % 2 === 1 ? 36 : 0,
                  },
                  theme.backgroundColor === palette.mist && styles.featureCardLight,
                ]}
              >
                <Text style={[styles.featureAccent, { color: theme.color }]}>
                  {theme.accent}
                </Text>
                <Text style={[styles.featureTitle, { color: theme.color }]}>
                  {skill.group}
                </Text>
                <Text style={[styles.featureText, { color: theme.color }]}>
                  {skill.summary}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 26,
    paddingVertical: 34,
    borderRadius: 46,
  },
  ambientBlur: {
    position: "absolute",
    right: 44,
    top: 24,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(228, 145, 201, 0.08)",
  },
  dotField: {
    position: "absolute",
    right: 22,
    top: 24,
    width: 90,
    height: 90,
    borderRadius: 24,
    ...(Platform.OS === "web"
      ? {
          backgroundImage:
            "radial-gradient(circle at 3px 3px, rgba(21,23,61,0.12) 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }
      : {
          backgroundColor: "rgba(21, 23, 61, 0.03)",
        }),
  },
  layout: {
    flexDirection: "row",
    gap: 28,
    alignItems: "center",
  },
  layoutCompact: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  leftColumn: {
    flex: 1,
    gap: 18,
  },
  heading: {
    color: palette.navy,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "900",
    fontFamily: fonts.display,
  },
  copy: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 24,
    maxWidth: 420,
    fontFamily: fonts.display,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  skillChipDark: {
    backgroundColor: palette.navy,
  },
  skillChipPurple: {
    backgroundColor: "rgba(152, 37, 152, 0.18)",
  },
  skillChipPink: {
    backgroundColor: "rgba(228, 145, 201, 0.22)",
  },
  skillChipSoft: {
    backgroundColor: palette.mist,
  },
  skillChipText: {
    fontSize: 11,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  skillChipTextLight: {
    color: "#FFFFFF",
  },
  skillChipTextDark: {
    color: palette.navy,
  },
  cardsGrid: {
    width: "100%",
    maxWidth: 374,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  featureCard: {
    width: 176,
    minHeight: 136,
    padding: 20,
    borderRadius: 22,
  },
  featureCardLight: {
    borderWidth: 1,
    borderColor: "rgba(152, 37, 152, 0.18)",
  },
  featureAccent: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  featureTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  featureText: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 20,
    opacity: 0.82,
    fontFamily: fonts.display,
  },
});

export default SkillsSection;
