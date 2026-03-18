import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
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
  SkillsSection
} from "../components/sections";
import fallbackPortfolio from "../data/fallbackPortfolio";
import { fetchPortfolio } from "../lib/api";
import { palette, webEffects } from "../lib/theme";

function HomeScreen() {
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [scrollY, setScrollY] = useState(0);
  const scrollViewRef = useRef(null);
  const sectionOffsets = useRef({});
  const heroOffset = useRef(0);
  const { height, width } = useWindowDimensions();
  const isWide = width >= 1024;
  const heroHeight = Math.max(isWide ? height * 3 : height * 2.2, isWide ? 1900 : 1520);
  const heroProgress = clamp(
    (scrollY - heroOffset.current) / Math.max(1, heroHeight - height),
    0,
    1
  );

  useEffect(() => {
    let ignore = false;

    const loadPortfolio = async () => {
      try {
        const payload = await fetchPortfolio();

        if (!ignore) {
          setPortfolio(payload);
        }
      } catch (_error) {
        // Fallback content is already loaded.
      }
    };

    loadPortfolio();

    return () => {
      ignore = true;
    };
  }, []);

  const registerSection = (key, y) => {
    sectionOffsets.current[key] = Math.max(0, y - 12);
  };

  const handleNavigate = (key) => {
    const orbitOffset =
      key === "orbit"
        ? sectionOffsets.current.top + Math.min(height * 0.45, 360)
        : sectionOffsets.current[key];

    scrollViewRef.current?.scrollTo({
      y: orbitOffset || 0,
      animated: true
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, webEffects.meshBackground]}>
      <StatusBar style="dark" />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.navWrapper}>
          <SectionNav isWide={isWide} onNavigate={handleNavigate} />
        </View>

        <View style={styles.page}>
          <View
            onLayout={(event) => {
              heroOffset.current = event.nativeEvent.layout.y;
              registerSection("top", event.nativeEvent.layout.y);
              registerSection(
                "orbit",
                event.nativeEvent.layout.y + Math.min(height * 0.45, 360)
              );
            }}
          >
            <HeroSection
              hero={portfolio.hero}
              isWide={isWide}
              metrics={portfolio.hero.metrics}
              onJourneyPress={() => handleNavigate("experience")}
              onTalkPress={() => handleNavigate("contact")}
              progress={heroProgress}
              projects={portfolio.projects}
              sectionHeight={heroHeight}
              viewportHeight={height}
            />
          </View>

          <View
            onLayout={(event) =>
              registerSection("experience", event.nativeEvent.layout.y)
            }
            style={styles.sectionGap}
          >
            <ExperienceSection
              experience={portfolio.experience}
              scrollY={scrollY}
              sectionTop={sectionOffsets.current.experience || 0}
              viewportHeight={height}
            />
          </View>

          <View
            onLayout={(event) =>
              registerSection("skills", event.nativeEvent.layout.y)
            }
            style={styles.sectionGap}
          >
            <SkillsSection isWide={isWide} skills={portfolio.skills} />
          </View>

          <View style={styles.sectionGap}>
            <HighlightsSection
              achievements={portfolio.achievements}
              education={portfolio.education}
            />
          </View>

          <View
            onLayout={(event) =>
              registerSection("contact", event.nativeEvent.layout.y)
            }
            style={styles.sectionGap}
          >
            <ContactSection contact={portfolio.contact} isWide={isWide} />
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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.canvas
  },
  scrollContent: {
    paddingBottom: 48
  },
  navWrapper: {
    paddingHorizontal: 18,
    backgroundColor: "rgba(255, 255, 255, 0.42)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(152, 37, 152, 0.08)",
    ...(Platform.OS === "web"
      ? {
          backdropFilter: "blur(20px)"
        }
      : {})
  },
  page: {
    width: "100%",
    maxWidth: 1240,
    alignSelf: "center",
    paddingHorizontal: 20
  },
  sectionGap: {
    marginTop: 110
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
