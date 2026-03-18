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

import { palette, surface } from "../../../lib/theme";
import { styles } from "./SkillsSection.style";

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

export default SkillsSection;
