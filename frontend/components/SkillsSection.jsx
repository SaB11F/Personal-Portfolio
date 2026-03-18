import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { fonts, palette, surface } from "../lib/theme";

const skillNodes = [
  { label: "React", tone: "dark", width: 110, x: 0, y: 0 },
  { label: "Node.js", tone: "dark", width: 114, x: 126, y: 0 },
  { label: "Express", tone: "dark", width: 114, x: 256, y: 0 },
  { label: "MongoDB", tone: "dark", width: 122, x: 386, y: 0 },
  { label: "OpenAI API", tone: "purple", width: 122, x: 0, y: 62 },
  { label: "LangChain", tone: "purple", width: 126, x: 138, y: 62 },
  { label: "RAG", tone: "purple", width: 82, x: 284, y: 62 },
  { label: "PostgreSQL", tone: "pink", width: 126, x: 382, y: 62 },
  { label: "Pinecone", tone: "pink", width: 106, x: 0, y: 122 },
  { label: "Docker", tone: "soft", width: 102, x: 132, y: 122 },
  { label: "Render", tone: "soft", width: 104, x: 252, y: 122 },
];

const nodeConnections = [
  ["React", "OpenAI API"],
  ["React", "LangChain"],
  ["React", "Pinecone"],
  ["Node.js", "OpenAI API"],
  ["Node.js", "LangChain"],
  ["Node.js", "Docker"],
  ["Express", "LangChain"],
  ["Express", "RAG"],
  ["Express", "Docker"],
  ["Express", "Render"],
  ["MongoDB", "RAG"],
  ["MongoDB", "PostgreSQL"],
  ["MongoDB", "Render"],
  ["OpenAI API", "RAG"],
  ["OpenAI API", "Docker"],
  ["LangChain", "RAG"],
  ["LangChain", "Pinecone"],
  ["LangChain", "Docker"],
  ["RAG", "PostgreSQL"],
  ["RAG", "Render"],
  ["PostgreSQL", "Docker"],
  ["Pinecone", "Docker"],
  ["Docker", "Render"],
];

const featureCardThemes = [
  {
    key: "ai",
    title: "AI Systems",
    icon: "creation-outline",
    backgroundColor: "#8C389A",
    color: "#FFFFFF",
    rotate: "2.5deg",
    width: 240,
    height: 170,
    staggerTop: 0,
  },
  {
    key: "stack",
    title: "Full Stack",
    icon: "layers-triple-outline",
    backgroundColor: palette.navy,
    color: "#FFFFFF",
    rotate: "-2deg",
    width: 242,
    height: 162,
    staggerTop: 16,
  },
  {
    key: "embedded",
    title: "Embedded",
    icon: "memory",
    backgroundColor: "#D494CB",
    color: palette.navy,
    rotate: "0deg",
    width: 240,
    height: 174,
    staggerTop: 0,
  },
  {
    key: "deployment",
    title: "Deployment",
    icon: "rocket-launch-outline",
    backgroundColor: "rgba(241, 233, 233, 0.9)",
    color: palette.navy,
    rotate: "5deg",
    width: 236,
    height: 152,
    staggerTop: 16,
    borderColor: "rgba(152, 37, 152, 0.14)",
  },
];

function SkillsSection({ isWide, skills }) {
  const { width } = useWindowDimensions();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const motionValues = useRef(
    skillNodes.map(() => new Animated.Value(0))
  ).current;
  const isPhone = width < 640;
  const shouldStackCompactCards = width < 760;
  const featureCards = buildFeatureCards(skills);
  const nodesByLabel = buildNodesByLabel(skillNodes);

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
        {buildDotCluster().map((dot) => (
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
              {nodeConnections.map((connection, index) => (
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

              {skillNodes.map((node, index) => {
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
                        getChipToneStyle(node.tone),
                        hoveredNode === node.label && styles.skillChipHovered,
                        Platform.OS === "web" && styles.skillChipTransition,
                      ]}
                    >
                      <Text
                        style={[
                          styles.skillChipText,
                          getChipToneTextStyle(node.tone),
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
              {skillNodes.map((node) => (
                <Pressable
                  key={node.label}
                  onPressIn={() => setHoveredNode(node.label)}
                  onPressOut={() => setHoveredNode(null)}
                  style={[
                    styles.skillChip,
                    styles.skillChipCompact,
                    getChipToneStyle(node.tone),
                    hoveredNode === node.label && styles.skillChipHovered,
                  ]}
                >
                  <Text
                    style={[
                      styles.skillChipText,
                      styles.skillChipTextCompact,
                      getChipToneTextStyle(node.tone),
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
            const theme = featureCardThemes[index];
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

function buildFeatureCards(skills) {
  const summaryByGroup = {
    "AI Systems": "Vector DBs, LLM\norchestration, Context\nEngineering.",
    "Full Stack": "Reactive UI, Secure\nREST/GraphQL APIs,\nMicroservices.",
    Embedded: "Hardware logic integration,\nIoT sensors, Computer\nVision.",
    Deployment: "CI/CD pipelines, Dockerized\nscaling, Cloud infra.",
  };

  return featureCardThemes.map((theme) => ({
    title: theme.title,
    summary:
      summaryByGroup[theme.title] ||
      skills.find((skill) => skill.group === theme.title)?.summary ||
      "",
  }));
}

function buildNodesByLabel(nodes) {
  return nodes.reduce((map, node) => {
    map[node.label] = node;
    return map;
  }, {});
}

function getChipToneStyle(tone) {
  switch (tone) {
    case "dark":
      return styles.skillChipDark;
    case "purple":
      return styles.skillChipPurple;
    case "pink":
      return styles.skillChipPink;
    default:
      return styles.skillChipSoft;
  }
}

function getChipToneTextStyle(tone) {
  switch (tone) {
    case "dark":
      return styles.skillChipTextLight;
    case "purple":
      return styles.skillChipTextPurple;
    default:
      return styles.skillChipTextDark;
  }
}

function getConnectionStyle({ from, index, to }) {
  const startX = from.x + from.width / 2;
  const startY = from.y + 21;
  const endX = to.x + to.width / 2;
  const endY = to.y + 21;
  const dx = endX - startX;
  const dy = endY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = `${(Math.atan2(dy, dx) * 180) / Math.PI}deg`;
  const midX = (startX + endX) / 2 - distance / 2;
  const midY = (startY + endY) / 2;

  return {
    left: midX,
    top: midY,
    width: distance,
    opacity: 0.58 + (index % 4) * 0.04,
    backgroundColor:
      index % 3 === 0
        ? "rgba(21, 23, 61, 0.26)"
        : "rgba(21, 23, 61, 0.18)",
    transform: [{ rotate: angle }],
  };
}

function buildDotCluster() {
  return [
    { key: "d1", left: 42, top: 0, size: 10, opacity: 0.1 },
    { key: "d2", left: 88, top: 0, size: 10, opacity: 0.1 },
    { key: "d3", left: 134, top: 0, size: 10, opacity: 0.1 },
    { key: "d4", left: 180, top: 6, size: 10, opacity: 0.1 },
    { key: "d5", left: 16, top: 34, size: 10, opacity: 0.12 },
    { key: "d6", left: 52, top: 24, size: 22, opacity: 0.14 },
    { key: "d7", left: 98, top: 24, size: 22, opacity: 0.14 },
    { key: "d8", left: 144, top: 24, size: 22, opacity: 0.14 },
    { key: "d9", left: 190, top: 34, size: 10, opacity: 0.12 },
    { key: "d10", left: 0, top: 72, size: 10, opacity: 0.12 },
    { key: "d11", left: 38, top: 62, size: 24, opacity: 0.14 },
    { key: "d12", left: 84, top: 54, size: 38, opacity: 0.14 },
    { key: "d13", left: 134, top: 54, size: 38, opacity: 0.14 },
    { key: "d14", left: 184, top: 64, size: 24, opacity: 0.12 },
    { key: "d15", left: 226, top: 74, size: 10, opacity: 0.1 },
  ];
}

const styles = StyleSheet.create({
  shell: {
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 56,
    paddingVertical: 54,
    borderRadius: 52,
    backgroundColor: "rgba(255, 251, 253, 0.8)",
    borderColor: "rgba(255, 255, 255, 0.34)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(20px)",
          boxShadow: "0 32px 90px rgba(21, 23, 61, 0.08)",
        }
      : {}),
  },
  shellCompact: {
    paddingHorizontal: 28,
    paddingVertical: 32,
    borderRadius: 38,
  },
  shellPhone: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    borderRadius: 30,
  },
  ambientGlow: {
    position: "absolute",
    left: -40,
    bottom: -52,
    width: 280,
    height: 200,
    borderRadius: 999,
    backgroundColor: "rgba(228, 145, 201, 0.08)",
  },
  ambientGlowSecondary: {
    position: "absolute",
    right: 74,
    top: 82,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(152, 37, 152, 0.03)",
  },
  dotCluster: {
    position: "absolute",
    right: 28,
    top: 58,
    width: 238,
    height: 122,
  },
  dot: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(21, 23, 61, 0.12)",
  },
  layout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 48,
  },
  layoutCompact: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 28,
  },
  leftColumn: {
    flex: 1,
    gap: 18,
    paddingTop: 8,
  },
  leftColumnCompact: {
    maxWidth: "100%",
    paddingTop: 0,
  },
  heading: {
    color: palette.navy,
    fontSize: 50,
    lineHeight: 54,
    fontWeight: "900",
    letterSpacing: -2.2,
    fontFamily: fonts.display,
  },
  headingCompact: {
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: -1.6,
  },
  headingPhone: {
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -1,
    fontFamily: fonts.display,
  },
  copy: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 28,
    maxWidth: 560,
    fontFamily: fonts.display,
  },
  copyCompact: {
    fontSize: 15,
    lineHeight: 28,
    maxWidth: "100%",
  },
  copyPhone: {
    fontSize: 14,
    lineHeight: 24,
  },
  networkStage: {
    position: "relative",
    width: 508,
    height: 172,
    marginTop: 24,
  },
  connectionLine: {
    position: "absolute",
    height: 2.2,
    borderRadius: 999,
  },
  nodeWrap: {
    position: "absolute",
  },
  mobileChipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  mobileChipWrapPhone: {
    gap: 8,
  },
  skillChip: {
    minHeight: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  skillChipCompact: {
    minHeight: 40,
    paddingHorizontal: 15,
  },
  skillChipTransition: {
    transitionDuration: "220ms",
    transitionProperty: "transform, box-shadow, border-color, background-color",
    transitionTimingFunction: "ease-out",
  },
  skillChipHovered: {
    transform: [{ scale: 1.04 }, { translateY: -2 }],
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 14px 28px rgba(152, 37, 152, 0.12)",
        }
      : {}),
  },
  skillChipDark: {
    backgroundColor: palette.navy,
    borderColor: "rgba(21, 23, 61, 0.06)",
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 12px 24px rgba(21, 23, 61, 0.08)",
        }
      : {}),
  },
  skillChipPurple: {
    backgroundColor: "rgba(152, 37, 152, 0.14)",
    borderColor: "rgba(152, 37, 152, 0.12)",
  },
  skillChipPink: {
    backgroundColor: "rgba(228, 145, 201, 0.2)",
    borderColor: "rgba(228, 145, 201, 0.24)",
  },
  skillChipSoft: {
    backgroundColor: "rgba(241, 233, 233, 0.94)",
    borderColor: "rgba(21, 23, 61, 0.06)",
  },
  skillChipText: {
    fontSize: 10,
    fontWeight: "900",
    fontFamily: fonts.display,
  },
  skillChipTextCompact: {
    fontSize: 10,
  },
  skillChipTextLight: {
    color: "#FFFFFF",
  },
  skillChipTextPurple: {
    color: "#6F257A",
  },
  skillChipTextDark: {
    color: palette.navy,
  },
  cardsStage: {
    width: 520,
    minHeight: 392,
    flexShrink: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: 18,
    paddingTop: 2,
  },
  cardsStageCompact: {
    width: "100%",
    minHeight: 0,
    gap: 14,
    marginTop: 2,
  },
  cardsStageSingleColumn: {
    flexDirection: "column",
  },
  featureCard: {
    overflow: "hidden",
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    borderRadius: 24,
    borderWidth: 1,
  },
  featureCardWide: {
    position: "relative",
  },
  featureCardCompact: {
    width: "48%",
    minHeight: 158,
  },
  featureCardSingleColumn: {
    width: "100%",
    minHeight: 148,
  },
  featureTitle: {
    marginTop: 16,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  featureText: {
    marginTop: 6,
    fontSize: 10,
    lineHeight: 15,
    opacity: 0.86,
    fontFamily: fonts.display,
  },
});

export default SkillsSection;
