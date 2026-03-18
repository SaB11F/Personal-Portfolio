import {
  FEATURE_CARD_SUMMARIES,
  FEATURE_CARD_THEMES,
} from "./SkillsSection.constants";

export function buildFeatureCards(skills) {
  const safeSkills = skills || [];

  return FEATURE_CARD_THEMES.map((theme) => ({
    title: theme.title,
    summary:
      FEATURE_CARD_SUMMARIES[theme.title] ||
      safeSkills.find((skill) => skill.group === theme.title)?.summary ||
      "",
  }));
}

export function buildNodesByLabel(nodes) {
  return nodes.reduce((map, node) => {
    map[node.label] = node;
    return map;
  }, {});
}

export function getChipToneStyle(styles, tone) {
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

export function getChipToneTextStyle(styles, tone) {
  switch (tone) {
    case "dark":
      return styles.skillChipTextLight;
    case "purple":
      return styles.skillChipTextPurple;
    default:
      return styles.skillChipTextDark;
  }
}

export function getConnectionStyle({ from, index, to }) {
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
