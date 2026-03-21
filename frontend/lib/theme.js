import { Platform } from "react-native";

export const palette = {
  navy: "#15173D",
  purple: "#982598",
  pink: "#E491C9",
  mist: "#F1E9E9",
  canvas: "#F8F6F8",
  white: "#FFF9FC",
  text: "#241F3E",
  muted: "#6A6280",
  line: "rgba(21, 23, 61, 0.12)",
  panel: "rgba(255, 250, 252, 0.96)",
};

export const shadow = Platform.select({
  web: {
    boxShadow: "0 24px 64px rgba(21, 23, 61, 0.12)"
  },
  default: {
    shadowColor: "#15173D",
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    elevation: 6,
  },
});

export const surface = {
  backgroundColor: palette.panel,
  borderWidth: 1,
  borderColor: palette.line,
  borderRadius: 28,
  ...(Platform.OS === "web"
    ? {
        backdropFilter: "blur(18px)"
      }
    : {}),
  ...shadow,
};

export const fonts = {
  display: Platform.OS === "web" ? "Space Grotesk, sans-serif" : undefined,
};

export const webEffects = {
  meshBackground:
    Platform.OS === "web"
      ? {
          backgroundImage:
            "radial-gradient(at 0% 0%, rgba(228,145,201,0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(152,37,152,0.1) 0px, transparent 50%)"
        }
      : {},
  cursorGlowOverlay:
    Platform.OS === "web"
      ? {
          backgroundImage:
            "radial-gradient(220px circle at var(--cursor-glow-x, 50%) var(--cursor-glow-y, 35%), rgba(228,145,201,0.24) 0%, rgba(228,145,201,0.12) 32%, transparent 64%), radial-gradient(420px circle at var(--cursor-glow-x, 50%) var(--cursor-glow-y, 35%), rgba(152,37,152,0.18) 0%, rgba(152,37,152,0.08) 36%, transparent 70%)",
          opacity: "var(--cursor-glow-opacity, 0)",
          transitionDuration: "180ms",
          transitionProperty: "opacity",
          transitionTimingFunction: "ease-out"
        }
      : {},
  dottedDark:
    Platform.OS === "web"
      ? {
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.16) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }
      : {},
};
