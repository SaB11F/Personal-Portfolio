import { StyleSheet, Text, View } from "react-native";

import { fonts, palette, surface } from "../lib/theme";

function ExperienceSection({ experience }) {
  const visibleExperience = experience;

  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View style={styles.headingLine} />
        <Text style={styles.heading}>Professional Journey</Text>
      </View>

      <View style={styles.stack}>
        {visibleExperience.map((item, index) => (
          <View
            key={`${item.company}-${item.role}`}
            style={[
              styles.card,
              surface,
              index === 0 ? styles.cardPrimary : styles.cardMuted,
            ]}
          >
            {index === 0 ? <View style={styles.primaryHalo} /> : null}

            <View style={styles.cardDateColumn}>
              <Text
                style={[
                  styles.cardDate,
                  index === 0 ? styles.cardDatePrimary : styles.cardDateMuted,
                ]}
              >
                {item.period}
              </Text>
              <Text style={styles.company}>{item.company}</Text>
              {item.meta ? <Text style={styles.meta}>{item.meta}</Text> : null}
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.role}>{item.role}</Text>
              <Text style={styles.copy}>{item.impact}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  stack: {
    gap: 18,
  },
  card: {
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    gap: 28,
    paddingHorizontal: 30,
    paddingVertical: 28,
    borderRadius: 30,
  },
  cardPrimary: {
    opacity: 1,
  },
  cardMuted: {
    opacity: 0.82,
  },
  primaryHalo: {
    position: "absolute",
    right: -48,
    top: -48,
    width: 128,
    height: 128,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.05)",
  },
  cardDateColumn: {
    width: 156,
  },
  cardDate: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: fonts.display,
  },
  cardDatePrimary: {
    color: palette.purple,
  },
  cardDateMuted: {
    color: "rgba(21, 23, 61, 0.58)",
  },
  company: {
    marginTop: 7,
    color: "rgba(21, 23, 61, 0.78)",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: fonts.display,
  },
  meta: {
    marginTop: 4,
    color: "rgba(21, 23, 61, 0.42)",
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.display,
  },
  cardContent: {
    flex: 1,
  },
  role: {
    color: palette.navy,
    fontSize: 26,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  copy: {
    marginTop: 10,
    color: palette.muted,
    fontSize: 14,
    lineHeight: 24,
    fontStyle: "italic",
    fontFamily: fonts.display,
  },
});

export default ExperienceSection;
