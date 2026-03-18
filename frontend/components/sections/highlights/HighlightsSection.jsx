import { Text, View } from "react-native";

import { styles } from "./HighlightsSection.style";

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

export default HighlightsSection;
