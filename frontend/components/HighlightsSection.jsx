import { StyleSheet, Text, View } from "react-native";

import { fonts, palette } from "../lib/theme";

function HighlightsSection({ achievements, education }) {
  const items = [
    {
      eyebrow: "Academic Excellence",
      title: education[0]?.program || "Computer Science & Automation",
      body:
        "Focused studies in computer science and automation systems with a focus on real-world engineering.",
    },
    {
      eyebrow: "National Patent",
      title: achievements[0] || "Patent number 26655",
      body:
        "Industrial innovation award for the fogponic modular agriculture logic and applied engineering approach.",
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Highlights</Text>

      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.eyebrow} style={styles.item}>
            <View style={styles.iconStub}>
              <View style={styles.iconDot} />
            </View>
            <View style={styles.copyColumn}>
              <Text style={styles.title}>{item.eyebrow}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default HighlightsSection;
