import { Platform, Text, useWindowDimensions, View } from "react-native";

import { surface } from "../../../lib/theme";
import { styles } from "./ExperienceSection.style";

function ExperienceSection({ experience }) {
  const { width } = useWindowDimensions();
  const isCompact = width < 920;

  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View style={styles.headingLine} />
        <Text style={styles.heading}>Professional Journey</Text>
      </View>

      <View style={styles.timeline}>
        {experience.map((item, index) => {
          const isFeatured = index === 0;
          const isLast = index === experience.length - 1;

          return (
            <View
              key={`${item.company}-${item.role}`}
              style={[styles.timelineItem, isCompact && styles.timelineItemCompact]}
            >
              <View
                style={[styles.railColumn, isCompact && styles.railColumnCompact]}
              >
                <View
                  style={[
                    styles.periodChip,
                    isFeatured ? styles.periodChipFeatured : styles.periodChipDefault,
                  ]}
                >
                  <Text
                    style={[
                      styles.periodChipText,
                      isFeatured
                        ? styles.periodChipTextFeatured
                        : styles.periodChipTextDefault,
                    ]}
                  >
                    {item.period}
                  </Text>
                </View>

                <View
                  style={[
                    styles.markerColumn,
                    isCompact && styles.markerColumnCompact,
                  ]}
                >
                  <View
                    style={[
                      styles.roadNode,
                      isFeatured ? styles.roadNodeFeatured : styles.roadNodeDefault,
                    ]}
                  >
                    {isFeatured ? <View style={styles.roadNodeCore} /> : null}
                  </View>

                  {!isLast ? (
                    <View
                      style={[
                        styles.roadStem,
                        isFeatured && styles.roadStemFeatured,
                        isCompact && styles.roadStemCompact,
                      ]}
                    />
                  ) : null}
                </View>
              </View>

              <View
                style={[styles.cardShell, isCompact && styles.cardShellCompact]}
              >
                {isFeatured ? (
                  <View pointerEvents="none" style={styles.primaryHalo} />
                ) : null}

                <View
                  style={[
                    styles.card,
                    surface,
                    isFeatured ? styles.cardFeatured : styles.cardDefault,
                    isCompact && styles.cardCompact,
                    Platform.OS === "web" &&
                      (isFeatured ? styles.cardFeaturedWeb : styles.cardDefaultWeb),
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.role}>{item.role}</Text>
                    <Text style={styles.company}>{item.company}</Text>
                  </View>

                  {item.meta ? <Text style={styles.meta}>{item.meta}</Text> : null}

                  <Text style={styles.copy}>{item.impact}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default ExperienceSection;
