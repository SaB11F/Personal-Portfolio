import { StyleSheet, Text, View } from "react-native";

import { fonts, palette, surface } from "../lib/theme";

const timelineLabels = [
  { period: "2021 - Present", note: "Current role", title: "Senior Full-Stack Developer" },
  { period: "2019 - 2021", note: "", title: "AI Systems Architect" },
  { period: "2018 - 2019", note: "", title: "Software Engineer" },
];

function ExperienceSection({ experience }) {
  const visibleExperience = experience.slice(0, 3);

  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View style={styles.headingLine} />
        <Text style={styles.heading}>Professional Journey</Text>
      </View>

      <View style={styles.stack}>
        {visibleExperience.map((item, index) => {
          const label = timelineLabels[index];

          return (
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
                  {label.period}
                </Text>
                {label.note ? (
                  <Text style={styles.currentRoleLabel}>{label.note}</Text>
                ) : null}
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.role}>{label.title}</Text>
                <Text style={styles.copy}>{item.impact}</Text>
              </View>
            </View>
          );
        })}
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
  currentRoleLabel: {
    marginTop: 7,
    color: "rgba(21, 23, 61, 0.34)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.9,
    textTransform: "uppercase",
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
