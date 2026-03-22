import { Platform } from "react-native";

export function getOrbitCardState({
  angle,
  cardHeight,
  cardWidth,
  index,
  isWide,
  total,
}) {
  const theta = (index * (360 / total) - angle) * (Math.PI / 180);
  const radiusX = isWide ? 482 : 188;
  const radiusY = isWide ? 224 : 142;
  const x = Math.sin(theta) * radiusX;
  const y = Math.cos(theta) * radiusY * 0.5;
  const z = Math.cos(theta) * 400;
  const scale = (z + 600) / 1000;
  const blur = Math.max(0, (400 - z) / 100);

  return {
    anchorLeft: isWide ? "74%" : "56%",
    anchorTop: isWide ? "50%" : "67%",
    opacity: Math.max(0.16, (z + 500) / 900),
    transform: [
      { perspective: 1200 },
      { translateX: x - cardWidth / 2 },
      { translateY: y - cardHeight / 2 },
      { scale },
      { rotate: `${Math.sin(theta) * -3}deg` },
      { rotateY: `${Math.sin(theta) * -15}deg` },
    ],
    webStyle:
      Platform.OS === "web"
        ? {
            filter: z < 0 ? `blur(${blur}px)` : "blur(0px)",
          }
        : {},
    zIndex: Math.round(z + 500),
  };
}

export function getProjectIconName(slug) {
  switch (slug) {
    case "rag-assistant":
      return "head-cog-outline";
    case "esa-cansat":
      return "satellite-variant";
    case "fogponic-system":
      return "leaf";
    case "sopkomat":
      return "view-grid-plus-outline";
    case "speed-bump":
      return "traffic-light-outline";
    default:
      return "shape-outline";
  }
}
