import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { fonts, palette, surface } from "../lib/theme";

const skillNodes = [
  { label: "React", tone: "dark", width: 126, x: 0, y: 0 },
  { label: "Node.js", tone: "dark", width: 144, x: 146, y: 0 },
  { label: "Express", tone: "dark", width: 140, x: 318, y: 0 },
  { label: "MongoDB", tone: "dark", width: 158, x: 490, y: 0 },
  { label: "OpenAI API", tone: "purple", width: 164, x: 0, y: 88 },
  { label: "LangChain", tone: "purple", width: 160, x: 176, y: 88 },
  { label: "RAG", tone: "purple", width: 108, x: 364, y: 88 },
  { label: "PostgreSQL", tone: "pink", width: 162, x: 500, y: 88 },
  { label: "Pinecone", tone: "pink", width: 130, x: 0, y: 168 },
  { label: "Docker", tone: "soft", width: 124, x: 170, y: 168 },
  { label: "Render", tone: "soft", width: 130, x: 330, y: 168 },
];

const nodeConnections = [
  ["React", "OpenAI API"],
  ["React", "LangChain"],
  ["Node.js", "OpenAI API"],
  ["Node.js", "LangChain"],
  ["Node.js", "Docker"],
  ["Express", "LangChain"],
  ["Express", "RAG"],
  ["Express", "Docker"],
  ["MongoDB", "RAG"],
  ["MongoDB", "PostgreSQL"],
  ["OpenAI API", "RAG"],
  ["OpenAI API", "Render"],
  ["LangChain", "PostgreSQL"],
  ["LangChain", "Pinecone"],
  ["RAG", "Render"],
  ["PostgreSQL", "Docker"],
  ["Pinecone", "Docker"],
  ["Docker", "Render"],
];

const cardThemes = [
  {
    key: "ai",
    title: "AI Systems",
    icon: "sparkles",
    backgroundColor: palette.purple,
    color: "#FFFFFF",
    rotate: "3deg",
    top: 6,
    left: 14,
    width: 242,
    height: 186,
    summary: "Vector DBs, LLM orchestration, Context Engineering.",
  },
  {
    key: "stack",
    title: "Full Stack",
    icon: "layers-triple-outline",
    backgroundColor: palette.navy,
    color: "#FFFFFF",
    rotate: "-2deg",
    top: 56,
    left: 288,
    width: 248,
    height: 176,
    summary: "Reactive UI, secure REST/GraphQL APIs, Microservices.",
  },
  {
    key: "embedded",
    title: "Embedded",
    icon: "memory",
    backgroundColor: palette.pink,
    color: palette.navy,
    rotate: "0deg",
    top: 226,
    left: 8,
    width: 248,
    height: 194,
    summary: "Hardware logic integration, IoT sensors, Computer Vision.",
  },
  {
    key: "deploy",
    title: "Deployment",
    icon: "rocket-launch-outline",
    backgroundColor: "rgba(241, 233, 233, 0.82)",
    color: palette.navy,
    rotate: "6deg",
    top: 266,
    left: 292,
    width: 236,
    height: 164,
    borderColor: "rgba(152, 37, 152, 0.18)",
    summary: "CI/CD pipelines, Dockerized scaling, Cloud infra.",
  },
];

function SkillsSection({ isWide, skills }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const motionValues = useRef(
    skillNodes.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const loops = motionValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 2600 + index * 120,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 2600 + index * 120,
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

  const featureCards = buildFeatureCards(skills);
  const nodesByLabel = {};

  skillNodes.forEach((node) => {
    nodesByLabel[node.label] = node;
  });

  return (
    <View style={[surface, styles.shell]}>
      <View style={styles.ambientBlur} />
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
        <View style={styles.leftColumn}>
          <Text style={styles.heading}>Technical Constellation</Text>
          <Text style={styles.copy}>
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
                      to: nodesByLabel[connection[1]],
                      index,
                    }),
                  ]}
                />
              ))}

              {skillNodes.map((node, index) => {
                const translateY = motionValues[index].interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, index % 2 === 0 ? -8 : -4, 0],
                });
                const translateX = motionValues[index].interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, index % 3 === 0 ? 3 : -3, 0],
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
                        Platform.OS === "web"
                          ? styles.skillChipTransition
                          : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.skillChipText,
                          node.tone === "dark"
                            ? styles.skillChipTextLight
                            : styles.skillChipTextDark,
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
            <View style={styles.mobileChipWrap}>
              {skillNodes.map((node, index) => (
                <Pressable
                  key={node.label}
                  onPressIn={() => setHoveredNode(node.label)}
                  onPressOut={() => setHoveredNode(null)}
                  style={[
                    styles.skillChip,
                    getChipToneStyle(node.tone),
                    index > 7 && styles.mobileChipSoftSpacing,
                    hoveredNode === node.label && styles.skillChipHovered,
                  ]}
                >
                  <Text
                    style={[
                      styles.skillChipText,
                      node.tone === "dark"
                        ? styles.skillChipTextLight
                        : styles.skillChipTextDark,
                    ]}
                  >
                      {node.label}
                    </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={[styles.cardsStage, !isWide && styles.cardsStageCompact]}>
          {featureCards.map((card, index) => {
            const theme = cardThemes[index];
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
                    ? {
                        position: "absolute",
                        left: theme.left,
                        top: theme.top,
                        width: theme.width,
                        minHeight: theme.height,
                      }
                    : styles.featureCardCompact,
                  {
                    backgroundColor: theme.backgroundColor,
                    borderColor: theme.borderColor || "transparent",
                    transform: [
                      { rotate: isHovered ? "0deg" : theme.rotate },
                      { translateY: isHovered ? -12 : 0 },
                      { scale: isHovered ? 1.035 : 1 },
                    ],
                  },
                  Platform.OS === "web"
                    ? {
                        transitionDuration: "220ms",
                        transitionProperty:
                          "transform, box-shadow, filter, background-color",
                        transitionTimingFunction: "ease-out",
                        boxShadow: isHovered
                          ? "0 20px 44px rgba(152, 37, 152, 0.18)"
                          : "0 14px 30px rgba(21, 23, 61, 0.08)",
                      }
                    : null,
                ]}
              >
                <MaterialCommunityIcons
                  color={theme.color}
                  name={theme.icon}
                  size={30}
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
    "AI Systems":
      "Vector DBs, LLM orchestration, retrieval pipelines, and context engineering.",
    "Full Stack":
      "Reactive UI, secure APIs, databases, and production application logic.",
    Embedded:
      "Hardware logic integration, sensors, computer vision, and device control.",
    Deployment:
      "CI/CD pipelines, Dockerized scaling, cloud deployment, and real production ops.",
  };

  return cardThemes.map((theme) => ({
    title: theme.title,
    summary:
      skills.find((skill) => skill.group === theme.title)?.summary ||
      summaryByGroup[theme.title],
  }));
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

function getConnectionStyle({ from, to, index }) {
  const startX = from.x + from.width / 2;
  const startY = from.y + 28;
  const endX = to.x + to.width / 2;
  const endY = to.y + 28;
  const dx = endX - startX;
  const dy = endY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = `${(Math.atan2(dy, dx) * 180) / Math.PI}deg`;
  const midX = (startX + endX) / 2 - distance / 2;
  const midY = (startY + endY) / 2 - 1;

  return {
    left: midX,
    top: midY,
    width: distance,
    opacity: 0.16 + (index % 4) * 0.05,
    backgroundColor:
      index % 3 === 0
        ? "rgba(152, 37, 152, 0.18)"
        : "rgba(21, 23, 61, 0.08)",
    transform: [{ rotate: angle }],
  };
}

function buildDotCluster() {
  return [
    { key: "d1", left: 46, top: 0, size: 12, opacity: 0.14 },
    { key: "d2", left: 90, top: 0, size: 12, opacity: 0.14 },
    { key: "d3", left: 20, top: 28, size: 24, opacity: 0.16 },
    { key: "d4", left: 64, top: 26, size: 24, opacity: 0.16 },
    { key: "d5", left: 110, top: 28, size: 24, opacity: 0.16 },
    { key: "d6", left: 156, top: 28, size: 24, opacity: 0.16 },
    { key: "d7", left: 0, top: 78, size: 12, opacity: 0.16 },
    { key: "d8", left: 42, top: 68, size: 26, opacity: 0.18 },
    { key: "d9", left: 88, top: 62, size: 42, opacity: 0.16 },
    { key: "d10", left: 140, top: 64, size: 42, opacity: 0.16 },
    { key: "d11", left: 194, top: 74, size: 24, opacity: 0.14 },
    { key: "d12", left: 16, top: 118, size: 24, opacity: 0.12 },
    { key: "d13", left: 62, top: 116, size: 24, opacity: 0.12 },
    { key: "d14", left: 108, top: 114, size: 24, opacity: 0.12 },
    { key: "d15", left: 156, top: 118, size: 24, opacity: 0.12 },
    { key: "d16", left: 204, top: 110, size: 12, opacity: 0.14 },
  ];
}

const styles = StyleSheet.create({
  shell: {
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 38,
    paddingVertical: 42,
    borderRadius: 54,
    backgroundColor: "rgba(255, 255, 255, 0.74)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(22px)",
          boxShadow: "0 30px 80px rgba(21, 23, 61, 0.08)",
        }
      : {}),
  },
  ambientBlur: {
    position: "absolute",
    left: 34,
    bottom: -36,
    width: 240,
    height: 180,
    borderRadius: 999,
    backgroundColor: "rgba(228, 145, 201, 0.08)",
  },
  dotCluster: {
    position: "absolute",
    right: 44,
    top: 56,
    width: 230,
    height: 150,
  },
  dot: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(21, 23, 61, 0.1)",
  },
  layout: {
    flexDirection: "row",
    gap: 42,
    alignItems: "center",
  },
  layoutCompact: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  leftColumn: {
    flex: 1,
    gap: 18,
    minHeight: 420,
    justifyContent: "center",
  },
  heading: {
    color: palette.navy,
    fontSize: 44,
    lineHeight: 48,
    fontWeight: "900",
    fontFamily: fonts.display,
  },
  copy: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 28,
    maxWidth: 560,
    fontFamily: fonts.display,
  },
  networkStage: {
    position: "relative",
    width: 648,
    height: 238,
    marginTop: 12,
  },
  connectionLine: {
    position: "absolute",
    height: 2,
    borderRadius: 999,
  },
  nodeWrap: {
    position: "absolute",
  },
  mobileChipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
  mobileChipSoftSpacing: {
    marginRight: 4,
  },
  skillChip: {
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  skillChipTransition: {
    transitionDuration: "220ms",
    transitionProperty: "transform, box-shadow, background-color",
    transitionTimingFunction: "ease-out",
  },
  skillChipHovered: {
    transform: [{ scale: 1.08 }, { translateY: -4 }],
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0 14px 26px rgba(152, 37, 152, 0.16)",
        }
      : {}),
  },
  skillChipDark: {
    backgroundColor: palette.navy,
  },
  skillChipPurple: {
    backgroundColor: "rgba(152, 37, 152, 0.16)",
  },
  skillChipPink: {
    backgroundColor: "rgba(228, 145, 201, 0.22)",
  },
  skillChipSoft: {
    backgroundColor: "rgba(241, 233, 233, 0.92)",
  },
  skillChipText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  skillChipTextLight: {
    color: "#FFFFFF",
  },
  skillChipTextDark: {
    color: palette.navy,
  },
  cardsStage: {
    position: "relative",
    width: 550,
    height: 444,
  },
  cardsStageCompact: {
    width: "100%",
    height: "auto",
    position: "relative",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 8,
  },
  featureCard: {
    overflow: "hidden",
    paddingHorizontal: 28,
    paddingVertical: 24,
    borderRadius: 28,
    borderWidth: 1,
  },
  featureCardCompact: {
    position: "relative",
    width: "47%",
    minHeight: 172,
  },
  featureTitle: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  featureText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.86,
    fontFamily: fonts.display,
  },
});

export default SkillsSection;
