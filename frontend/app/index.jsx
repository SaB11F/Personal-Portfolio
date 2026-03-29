import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SectionNav } from "../components/navigation";
import {
  ContactSection,
  ExperienceSection,
  HeroSection,
  HighlightsSection,
  PhotoRingSection,
  SkillsSection
} from "../components/sections";
import fallbackPortfolio from "../data/fallbackPortfolio";
import { palette, webEffects } from "../lib/theme";

function HomeScreen() {
  const scrollViewRef = useRef(null);
  const sectionOffsets = useRef({});
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  useEffect(() => {
    if (Platform.OS !== "web") {
      return undefined;
    }

    const pointerCapability = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isEnabled =
      pointerCapability.matches &&
      !reduceMotionQuery.matches &&
      document.visibilityState === "visible";
    const root = document.documentElement;
    let frameId = null;
    let hasQueuedFrame = false;
    let pendingX = window.innerWidth * 0.5;
    let pendingY = window.innerHeight * 0.24;

    const updateGlow = (clientX, clientY, opacity) => {
      root.style.setProperty("--cursor-glow-x", `${clientX}px`);
      root.style.setProperty("--cursor-glow-y", `${clientY}px`);
      root.style.setProperty("--cursor-glow-opacity", opacity);
    };

    const hideGlow = () => {
      root.style.setProperty("--cursor-glow-opacity", "0");
    };

    const flushFrame = () => {
      hasQueuedFrame = false;
      frameId = null;

      if (!isEnabled) {
        return;
      }

      updateGlow(pendingX, pendingY, "1");
    };

    const handlePointerMove = (event) => {
      if (!isEnabled) {
        return;
      }

      pendingX = event.clientX;
      pendingY = event.clientY;

      if (hasQueuedFrame) {
        return;
      }

      hasQueuedFrame = true;
      frameId = requestAnimationFrame(flushFrame);
    };

    const handlePointerLeave = () => {
      hideGlow();
    };

    const updateEnabledState = () => {
      isEnabled =
        pointerCapability.matches &&
        !reduceMotionQuery.matches &&
        document.visibilityState === "visible";

      if (!isEnabled) {
        hideGlow();
      }
    };

    const handleVisibilityChange = () => {
      updateEnabledState();
    };

    updateGlow(window.innerWidth * 0.5, window.innerHeight * 0.24, "0");
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (typeof pointerCapability.addEventListener === "function") {
      pointerCapability.addEventListener("change", updateEnabledState);
      reduceMotionQuery.addEventListener("change", updateEnabledState);
    } else if (typeof pointerCapability.addListener === "function") {
      pointerCapability.addListener(updateEnabledState);
      reduceMotionQuery.addListener(updateEnabledState);
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (typeof pointerCapability.removeEventListener === "function") {
        pointerCapability.removeEventListener("change", updateEnabledState);
        reduceMotionQuery.removeEventListener("change", updateEnabledState);
      } else if (typeof pointerCapability.removeListener === "function") {
        pointerCapability.removeListener(updateEnabledState);
        reduceMotionQuery.removeListener(updateEnabledState);
      }

      root.style.removeProperty("--cursor-glow-x");
      root.style.removeProperty("--cursor-glow-y");
      root.style.removeProperty("--cursor-glow-opacity");
    };
  }, []);

  const registerSection = useCallback((key, y) => {
    sectionOffsets.current[key] = Math.max(0, y - 12);
  }, []);

  const handleNavigate = useCallback((key) => {
    scrollViewRef.current?.scrollTo({
      y: sectionOffsets.current[key] ?? sectionOffsets.current.top ?? 0,
      animated: true
    });
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, webEffects.meshBackground]}>
      <StatusBar style="dark" />
      <View pointerEvents="none" style={[styles.cursorGlow, webEffects.cursorGlowOverlay]} />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.navWrapper}>
          <SectionNav isWide={isWide} onNavigate={handleNavigate} />
        </View>

        <View style={styles.page}>
          <View
            onLayout={(event) => {
              registerSection("top", event.nativeEvent.layout.y);
              registerSection("orbit", event.nativeEvent.layout.y);
            }}
          >
            <HeroSection
              hero={fallbackPortfolio.hero}
              isWide={isWide}
              onJourneyPress={() => handleNavigate("experience")}
              onTalkPress={() => handleNavigate("contact")}
              projects={fallbackPortfolio.projects}
            />
          </View>

          <View
            style={styles.memoryGap}
          >
            <PhotoRingSection />
          </View>

          <View
            onLayout={(event) =>
              registerSection("experience", event.nativeEvent.layout.y)
            }
            style={styles.photoRingExitGap}
          >
            <ExperienceSection experience={fallbackPortfolio.experience} />
          </View>

          <View
            onLayout={(event) =>
              registerSection("skills", event.nativeEvent.layout.y)
            }
            style={styles.sectionGap}
          >
            <SkillsSection isWide={isWide} skills={fallbackPortfolio.skills} />
          </View>

          <View style={styles.sectionGap}>
            <HighlightsSection
              achievements={fallbackPortfolio.achievements}
              education={fallbackPortfolio.education}
            />
          </View>

          <View
            onLayout={(event) =>
              registerSection("contact", event.nativeEvent.layout.y)
            }
            style={styles.sectionGap}
          >
            <ContactSection contact={fallbackPortfolio.contact} isWide={isWide} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Rene Kolednik. Engineered for the future.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: "relative",
    backgroundColor: palette.canvas
  },
  cursorGlow: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    ...(Platform.OS === "web"
      ? {
          position: "fixed"
        }
      : {})
  },
  scrollContent: {
    position: "relative",
    zIndex: 1,
    paddingBottom: 48
  },
  navWrapper: {
    paddingHorizontal: 18,
    backgroundColor: "rgba(255, 255, 255, 0.42)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(152, 37, 152, 0.08)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(14px)"
        }
      : {})
  },
  page: {
    width: "100%",
    maxWidth: 1480,
    alignSelf: "center",
    paddingHorizontal: 8
  },
  sectionGap: {
    marginTop: 110
  },
  photoRingExitGap: {
    marginTop: 72
  },
  memoryGap: {
    marginTop: 2
  },
  footer: {
    paddingTop: 24,
    alignItems: "center"
  },
  footerText: {
    color: "rgba(21, 23, 61, 0.34)",
    fontSize: 12
  }
});

export default HomeScreen;
