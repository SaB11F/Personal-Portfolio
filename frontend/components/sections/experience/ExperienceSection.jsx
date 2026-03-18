import { Platform, Text, View } from "react-native";
import { useState } from "react";

import { surface } from "../../../lib/theme";
import { styles } from "./ExperienceSection.style";

function ExperienceSection({ experience, scrollY, sectionTop, viewportHeight }) {
  const [cardLayouts, setCardLayouts] = useState({});

  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View style={styles.headingLine} />
        <Text style={styles.heading}>Professional Journey</Text>
      </View>

      <View style={styles.stack}>
        {experience.map((item, index) => {
          const layout = cardLayouts[index];
          const emphasis = getCardEmphasis({
            cardLayout: layout,
            scrollY,
            sectionTop,
            viewportHeight,
          });

          return (
            <View
              key={`${item.company}-${item.role}`}
              onLayout={(event) => {
                const { height, y } = event.nativeEvent.layout;

                setCardLayouts((current) => {
                  const previous = current[index];

                  if (
                    previous &&
                    previous.height === height &&
                    previous.y === y
                  ) {
                    return current;
                  }

                  return {
                    ...current,
                    [index]: { height, y },
                  };
                });
              }}
              style={[
                styles.cardShell,
                {
                  zIndex: Math.round(emphasis * 10),
                  transform: [
                    { scale: 1 + emphasis * 0.035 },
                    { translateY: emphasis * -10 },
                  ],
                },
                Platform.OS === "web"
                  ? {
                      transitionDuration: "240ms",
                      transitionProperty:
                        "transform, opacity, box-shadow, border-color, background-color",
                      transitionTimingFunction: "ease-out",
                    }
                  : null,
              ]}
            >
              <View
                pointerEvents="none"
                style={[
                  styles.cardGlow,
                  {
                    opacity: emphasis * 0.75,
                    transform: [{ scale: 0.94 + emphasis * 0.12 }],
                  },
                ]}
              />

              <View
                style={[
                  styles.card,
                  surface,
                  emphasis > 0.18 ? styles.cardFocused : styles.cardMuted,
                  {
                    opacity: 0.78 + emphasis * 0.22,
                    borderColor:
                      emphasis > 0.45
                        ? "rgba(152, 37, 152, 0.18)"
                        : "rgba(21, 23, 61, 0.08)",
                  },
                  Platform.OS === "web"
                    ? {
                        boxShadow:
                          emphasis > 0.01
                            ? `0 ${18 + emphasis * 18}px ${40 + emphasis * 24}px rgba(152, 37, 152, ${0.06 + emphasis * 0.08})`
                            : "0 14px 36px rgba(21, 23, 61, 0.06)",
                        backgroundColor:
                          emphasis > 0.2
                            ? "rgba(255, 251, 255, 0.98)"
                            : "rgba(255, 250, 252, 0.92)",
                      }
                    : null,
                ]}
              >
                {index === 0 ? (
                  <View
                    style={[
                      styles.primaryHalo,
                      {
                        opacity: 0.08 + emphasis * 0.12,
                      },
                    ]}
                  />
                ) : null}

                <View style={styles.cardDateColumn}>
                  <Text
                    style={[
                      styles.cardDate,
                      index === 0 || emphasis > 0.45
                        ? styles.cardDatePrimary
                        : styles.cardDateMuted,
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
            </View>
          );
        })}
      </View>
    </View>
  );
}

function getCardEmphasis({ cardLayout, scrollY, sectionTop, viewportHeight }) {
  if (!cardLayout || !viewportHeight) {
    return 0;
  }

  const focusPoint = scrollY + viewportHeight * 0.42;
  const cardCenter = sectionTop + cardLayout.y + cardLayout.height / 2;
  const distance = Math.abs(cardCenter - focusPoint);
  const maxDistance = viewportHeight * 0.55;

  return clamp(1 - distance / maxDistance, 0, 1);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default ExperienceSection;
