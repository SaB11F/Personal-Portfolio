import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { surface } from "../../../lib/theme";
import {
  DOT_CLUSTER_DOTS,
  FEATURE_CARD_THEMES,
  NODE_CONNECTIONS,
  SKILL_NODES,
} from "./SkillsSection.constants";
import {
  buildFeatureCards,
  buildNodesByLabel,
  getChipToneStyle,
  getChipToneTextStyle,
  getConnectionStyle,
} from "./SkillsSection.helpers";
import { styles } from "./SkillsSection.style";

function SkillsSection({ isWide, skills }) {
  const { width } = useWindowDimensions();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const motionValues = useRef(
    SKILL_NODES.map(() => new Animated.Value(0))
  ).current;
  const isPhone = width < 640;
  const shouldStackCompactCards = width < 760;
  const featureCards = buildFeatureCards(skills);
  const nodesByLabel = buildNodesByLabel(SKILL_NODES);

  useEffect(() => {
    const loops = motionValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 3000 + index * 120,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 3000 + index * 120,
            useNativeDriver: true,
          }),
        ])
      )
    );

    loops.forEach((loop) => loop.start());

    return () => {
      loops.forEach((loop) => loop.stop());
    };
  }, [motionValues]);

  return (
    <View
      style={[
        surface,
        styles.shell,
        !isWide && styles.shellCompact,
        isPhone && styles.shellPhone,
      ]}
    >
      <View pointerEvents="none" style={styles.ambientGlow} />
      <View pointerEvents="none" style={styles.ambientGlowSecondary} />

      <View pointerEvents="none" style={styles.dotCluster}>
        {DOT_CLUSTER_DOTS.map((dot) => (
          <View
            key={dot.key}
            style={[
              styles.dot,
              {
                left: dot.left,
                top: dot.top,
                width: dot.size,
                height: dot.size,
                opacity: dot.opacity,
              },
            ]}
          />
        ))}
      </View>

      <View style={[styles.layout, !isWide && styles.layoutCompact]}>
        <View style={[styles.leftColumn, !isWide && styles.leftColumnCompact]}>
          <Text
            style={[
              styles.heading,
              !isWide && styles.headingCompact,
              isPhone && styles.headingPhone,
            ]}
          >
            Technical Constellation
          </Text>
          <Text
            style={[
              styles.copy,
              !isWide && styles.copyCompact,
              isPhone && styles.copyPhone,
            ]}
          >
            A carefully selected stack for building scalable, intelligent, and
            real-time software solutions.
          </Text>

          {isWide ? (
            <View style={styles.networkStage}>
              {NODE_CONNECTIONS.map((connection, index) => (
                <View
                  key={`${connection[0]}-${connection[1]}`}
                  pointerEvents="none"
                  style={[
                    styles.connectionLine,
                    getConnectionStyle({
                      from: nodesByLabel[connection[0]],
                      index,
                      to: nodesByLabel[connection[1]],
                    }),
                  ]}
                />
              ))}

              {SKILL_NODES.map((node, index) => {
                const translateY = motionValues[index].interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, index % 2 === 0 ? -5 : -3, 0],
                });
                const translateX = motionValues[index].interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, index % 3 === 0 ? 2 : -2, 0],
                });

                return (
                  <Animated.View
                    key={node.label}
                    style={[
                      styles.nodeWrap,
                      {
                        left: node.x,
                        top: node.y,
                        width: node.width,
                        transform: [{ translateY }, { translateX }],
                      },
                    ]}
                  >
                    <Pressable
                      onHoverIn={() => setHoveredNode(node.label)}
                      onHoverOut={() => setHoveredNode(null)}
                      onPressIn={() => setHoveredNode(node.label)}
                      onPressOut={() => setHoveredNode(null)}
                      style={[
                        styles.skillChip,
                        getChipToneStyle(styles, node.tone),
                        hoveredNode === node.label && styles.skillChipHovered,
                        Platform.OS === "web" && styles.skillChipTransition,
                      ]}
                    >
                      <Text
                        style={[
                          styles.skillChipText,
                          getChipToneTextStyle(styles, node.tone),
                        ]}
                      >
                        {node.label}
                      </Text>
                    </Pressable>
                  </Animated.View>
                );
              })}
            </View>
          ) : (
            <View
              style={[
                styles.mobileChipWrap,
                isPhone && styles.mobileChipWrapPhone,
              ]}
            >
              {SKILL_NODES.map((node) => (
                <Pressable
                  key={node.label}
                  onPressIn={() => setHoveredNode(node.label)}
                  onPressOut={() => setHoveredNode(null)}
                  style={[
                    styles.skillChip,
                    styles.skillChipCompact,
                    getChipToneStyle(styles, node.tone),
                    hoveredNode === node.label && styles.skillChipHovered,
                  ]}
                >
                  <Text
                    style={[
                      styles.skillChipText,
                      styles.skillChipTextCompact,
                      getChipToneTextStyle(styles, node.tone),
                    ]}
                  >
                    {node.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View
          style={[
            styles.cardsStage,
            !isWide && styles.cardsStageCompact,
            shouldStackCompactCards && styles.cardsStageSingleColumn,
          ]}
        >
          {featureCards.map((card, index) => {
            const theme = FEATURE_CARD_THEMES[index];
            const isHovered = hoveredCard === index;

            return (
              <Pressable
                key={card.title}
                onHoverIn={() => setHoveredCard(index)}
                onHoverOut={() => setHoveredCard(null)}
                onPressIn={() => setHoveredCard(index)}
                onPressOut={() => setHoveredCard(null)}
                style={[
                  styles.featureCard,
                  isWide
                    ? [
                        styles.featureCardWide,
                        {
                          width: theme.width,
                          minHeight: theme.height,
                          marginTop: theme.staggerTop,
                        },
                      ]
                    : shouldStackCompactCards
                      ? styles.featureCardSingleColumn
                      : styles.featureCardCompact,
                  {
                    backgroundColor: theme.backgroundColor,
                    borderColor: theme.borderColor || "transparent",
                    transform: [
                      { rotate: isHovered ? "0deg" : theme.rotate },
                      { translateY: isHovered ? -4 : 0 },
                    ],
                  },
                  Platform.OS === "web"
                    ? {
                        transitionDuration: "220ms",
                        transitionProperty:
                          "transform, box-shadow, filter, background-color",
                        transitionTimingFunction: "ease-out",
                        boxShadow: isHovered
                          ? "0 22px 42px rgba(21, 23, 61, 0.12)"
                          : "0 16px 28px rgba(21, 23, 61, 0.07)",
                      }
                    : null,
                ]}
              >
                <MaterialCommunityIcons
                  color={theme.color}
                  name={theme.icon}
                  size={isWide ? 28 : 26}
                />

                <Text style={[styles.featureTitle, { color: theme.color }]}>
                  {card.title}
                </Text>
                <Text style={[styles.featureText, { color: theme.color }]}>
                  {card.summary}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default SkillsSection;
