import { StatusBar } from "expo-status-bar";
import { useCallback, useRef } from "react";
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
import portfolioContent from "../data/portfolioContent";
import { palette, webEffects } from "../lib/theme";

function HomeScreen() {
  const scrollViewRef = useRef(null);
  const sectionOffsets = useRef({});
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

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
              hero={portfolioContent.hero}
              isWide={isWide}
              onJourneyPress={() => handleNavigate("experience")}
              onTalkPress={() => handleNavigate("contact")}
              projects={portfolioContent.projects}
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
            <ExperienceSection experience={portfolioContent.experience} />
          </View>

          <View
            onLayout={(event) =>
              registerSection("skills", event.nativeEvent.layout.y)
            }
            style={styles.sectionGap}
          >
            <SkillsSection isWide={isWide} skills={portfolioContent.skills} />
          </View>

          <View style={styles.sectionGap}>
            <HighlightsSection
              achievements={portfolioContent.achievements}
              education={portfolioContent.education}
            />
          </View>

          <View
            onLayout={(event) =>
              registerSection("contact", event.nativeEvent.layout.y)
            }
            style={styles.sectionGap}
          >
            <ContactSection contact={portfolioContent.contact} isWide={isWide} />
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
