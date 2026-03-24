import { MaterialCommunityIcons } from "@expo/vector-icons";
import { memo, useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(Platform.OS !== "web");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const motionValues = useRef(
    SKILL_NODES.map(() => new Animated.Value(0))
  ).current;
  const sectionRef = useRef(null);
  const isPhone = width < 640;
  const shouldStackCompactCards = width < 760;
  const featureCards = buildFeatureCards(skills);
  const nodesByLabel = buildNodesByLabel(SKILL_NODES);
  const shouldAnimateNodes =
    Platform.OS === "web" && isWide && !prefersReducedMotion && isVisible;

  useEffect(() => {
    if (Platform.OS !== "web") {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReduceMotionChange = () => {
      setPrefersReducedMotion(reduceMotionQuery.matches);
    };
    handleReduceMotionChange();

    if (typeof reduceMotionQuery.addEventListener === "function") {
      reduceMotionQuery.addEventListener("change", handleReduceMotionChange);
    } else if (typeof reduceMotionQuery.addListener === "function") {
      reduceMotionQuery.addListener(handleReduceMotionChange);
    }

    let observer;
    if ("IntersectionObserver" in window && sectionRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(Boolean(entry?.isIntersecting));
        },
        {
          threshold: 0.16,
        }
      );
      observer.observe(sectionRef.current);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }

      if (typeof reduceMotionQuery.removeEventListener === "function") {
        reduceMotionQuery.removeEventListener("change", handleReduceMotionChange);
      } else if (typeof reduceMotionQuery.removeListener === "function") {
        reduceMotionQuery.removeListener(handleReduceMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimateNodes) {
      motionValues.forEach((value) => {
        value.stopAnimation();
        value.setValue(0);
      });
      return undefined;
    }

    const loops = motionValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 4400 + index * 180,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 4400 + index * 180,
            useNativeDriver: true,
          }),
        ])
      )
    );

    loops.forEach((loop) => loop.start());

    return () => {
      loops.forEach((loop) => loop.stop());
    };
  }, [motionValues, shouldAnimateNodes]);

  return (
    <View
      ref={sectionRef}
      style={[
        surface,
        styles.shell,
        !isWide && styles.shellCompact,
        isPhone && styles.shellPhone,
      ]}
    >
      <View pointerEvents="none" style={styles.ambientGlow} />
      <View pointerEvents="none" style={styles.ambientGlowSecondary} />
      <View pointerEvents="none" style={styles.abstractBlobLeft} />
      <View pointerEvents="none" style={styles.abstractBlobRight} />
      <View pointerEvents="none" style={styles.abstractRing} />

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
          <View style={styles.headerBlock}>
            <Text style={styles.eyebrow}>Stack Map</Text>
            <View style={styles.headingAccent} />
          </View>
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

          <View style={styles.networkPanel}>
            <View style={styles.networkPanelHeader}>
              <Text style={styles.networkPanelTitle}>Core Stack</Text>
              <Text style={styles.networkPanelMeta}>Interface to intelligence</Text>
            </View>

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
                    backgroundColor: theme.solidBackgroundColor || theme.backgroundColor,
                    borderColor: theme.borderColor || "transparent",
                    transform: [
                      { rotate: isHovered ? "0deg" : theme.rotate },
                      { translateY: isHovered ? -4 : 0 },
                    ],
                  },
                  Platform.OS === "web"
                    ? {
                        backgroundImage: theme.backgroundColor,
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
                <View
                  style={[
                    styles.featureIconTile,
                    {
                      backgroundColor: theme.iconTileBackgroundColor,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    color={theme.color}
                    name={theme.icon}
                    size={isWide ? 26 : 24}
                  />
                </View>

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

export default memo(SkillsSection);
