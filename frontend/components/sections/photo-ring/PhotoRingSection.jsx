import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { AppIcon } from "../../common";
import { palette } from "../../../lib/theme";
import {
  PHOTO_RING_ITEMS,
  PHOTO_RING_LOOP_COPIES,
} from "./PhotoRingSection.constants";
import {
  buildLoopItems,
  getRingMetrics,
  shouldCaptureHorizontalGesture,
  wrapTrackPosition,
} from "./PhotoRingSection.helpers";
import { styles } from "./PhotoRingSection.style";

function PhotoRingSection() {
  const { width } = useWindowDimensions();
  const { cardWidth, cardHeight, gap, spill, verticalPadding } = useMemo(
    () => getRingMetrics(width),
    [width]
  );
  const isCompact = width < 900;
  const [isVisible, setIsVisible] = useState(Platform.OS !== "web");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const lightboxAnimation = useRef(new Animated.Value(0)).current;
  const momentumFrame = useRef(null);
  const autoFrame = useRef(null);
  const autoLastTick = useRef(null);
  const wrappingRef = useRef(false);
  const positionRef = useRef(0);
  const dragStartRef = useRef(0);
  const isDraggingRef = useRef(false);
  const activeItemRef = useRef(null);
  const sectionRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const interactionRef = useRef({
    moved: false,
    hasMomentum: false,
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [closeHovered, setCloseHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const loopItems = useMemo(
    () => buildLoopItems(PHOTO_RING_ITEMS, PHOTO_RING_LOOP_COPIES),
    []
  );
  const loopSpan = PHOTO_RING_ITEMS.length * (cardWidth + gap);
  const anchor = -loopSpan * 2 - cardWidth * 0.38;
  const sectionWidth = width;
  const shouldAnimateAmbient = !prefersReducedMotion && isVisible && !activeItem;

  useEffect(() => {
    if (Platform.OS !== "web") {
      return undefined;
    }

    const handleReduceMotionChange = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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
          threshold: 0.14,
        }
      );
      observer.observe(sectionRef.current);
    } else {
      setIsVisible(true);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        setIsVisible(false);
        return;
      }

      if (!observer) {
        setIsVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

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
    positionRef.current = anchor;
    translateX.setValue(anchor);
  }, [anchor, translateX]);

  useEffect(() => {
    const listenerId = translateX.addListener(({ value }) => {
      if (wrappingRef.current) {
        positionRef.current = value;
        return;
      }

      const wrappedValue = wrapTrackPosition(value, anchor, loopSpan);

      if (wrappedValue !== value) {
        wrappingRef.current = true;
        positionRef.current = wrappedValue;
        translateX.setValue(wrappedValue);
        requestAnimationFrame(() => {
          wrappingRef.current = false;
        });
        return;
      }

      positionRef.current = value;
    });

    return () => {
      translateX.removeListener(listenerId);
    };
  }, [anchor, loopSpan, translateX]);

  useEffect(() => {
    return () => {
      if (momentumFrame.current) {
        cancelAnimationFrame(momentumFrame.current);
      }

      if (autoFrame.current) {
        cancelAnimationFrame(autoFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimateAmbient) {
      if (autoFrame.current) {
        cancelAnimationFrame(autoFrame.current);
        autoFrame.current = null;
      }
      autoLastTick.current = null;
      return undefined;
    }

    const step = (timestamp) => {
      if (autoLastTick.current == null) {
        autoLastTick.current = timestamp;
      }

      const delta = timestamp - autoLastTick.current;
      autoLastTick.current = timestamp;

      if (
        !isDraggingRef.current &&
        !interactionRef.current.hasMomentum &&
        !activeItemRef.current
      ) {
        translateX.setValue(
          wrapTrackPosition(
            positionRef.current - delta * 0.02,
            anchor,
            loopSpan
          )
        );
      }

      autoFrame.current = requestAnimationFrame(step);
    };

    autoFrame.current = requestAnimationFrame(step);

    return () => {
      if (autoFrame.current) {
        cancelAnimationFrame(autoFrame.current);
        autoFrame.current = null;
      }

      autoLastTick.current = null;
    };
  }, [anchor, loopSpan, shouldAnimateAmbient, translateX]);

  const stopMomentum = () => {
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }

    interactionRef.current.hasMomentum = false;
  };

  const startMomentum = (velocity) => {
    stopMomentum();
    interactionRef.current.hasMomentum = true;

    let currentVelocity = velocity;

    const step = () => {
      if (Math.abs(currentVelocity) < 0.18) {
        interactionRef.current.hasMomentum = false;
        momentumFrame.current = null;
        return;
      }

      translateX.setValue(
        wrapTrackPosition(positionRef.current + currentVelocity, anchor, loopSpan)
      );
      currentVelocity *= 0.94;
      momentumFrame.current = requestAnimationFrame(step);
    };

    momentumFrame.current = requestAnimationFrame(step);
  };

  const showLightbox = (item) => {
    if (interactionRef.current.moved || interactionRef.current.hasMomentum) {
      return;
    }

    activeItemRef.current = item;
    setActiveItem(item);
    lightboxAnimation.setValue(0);

    Animated.timing(lightboxAnimation, {
      toValue: 1,
      duration: 240,
      useNativeDriver: true,
    }).start();
  };

  const hideLightbox = () => {
    Animated.timing(lightboxAnimation, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        activeItemRef.current = null;
        setActiveItem(null);
      }
    });
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          shouldCaptureHorizontalGesture(gestureState),
        onMoveShouldSetPanResponderCapture: (_, gestureState) =>
          shouldCaptureHorizontalGesture(gestureState),
        onPanResponderGrant: () => {
          stopMomentum();
          interactionRef.current.moved = false;
          isDraggingRef.current = true;
          setIsDragging(true);
          dragStartRef.current = positionRef.current;
        },
        onPanResponderMove: (_, gestureState) => {
          if (Math.abs(gestureState.dx) > 4) {
            interactionRef.current.moved = true;
          }

          translateX.setValue(
            wrapTrackPosition(dragStartRef.current + gestureState.dx, anchor, loopSpan)
          );
        },
        onPanResponderRelease: (_, gestureState) => {
          isDraggingRef.current = false;
          setIsDragging(false);

          if (Math.abs(gestureState.vx) > 0.08) {
            startMomentum(gestureState.vx * 22);
          } else {
            interactionRef.current.hasMomentum = false;
          }

          setTimeout(() => {
            interactionRef.current.moved = false;
          }, 120);
        },
        onPanResponderTerminate: () => {
          isDraggingRef.current = false;
          setIsDragging(false);
          interactionRef.current.moved = false;
        },
      }),
    [anchor, loopSpan]
  );

  return (
    <View
      ref={sectionRef}
      style={[
        styles.section,
        isCompact && styles.sectionCompact,
        {
          width: sectionWidth,
          paddingVertical: verticalPadding,
        },
      ]}
    >
      <View style={styles.viewport}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.trackGestureLayer,
            isDragging && styles.trackGestureLayerDragging,
            {
              paddingLeft: spill,
              paddingRight: spill,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.track,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            {loopItems.map((item) => {
              const isHovered = hoveredCard === item.loopKey && !isDragging;

              return (
                <View
                  key={item.loopKey}
                  style={[
                    styles.cardShell,
                    {
                      width: cardWidth,
                      height: cardHeight,
                      marginRight: gap,
                      marginTop: item.offsetY,
                    },
                    isHovered && styles.cardShellLifted,
                  ]}
                >
                  <Pressable
                    accessibilityRole="button"
                    onHoverIn={() => setHoveredCard(item.loopKey)}
                    onHoverOut={() => setHoveredCard(null)}
                    onPress={() => showLightbox(item)}
                    style={[
                      styles.cardFrame,
                      isHovered && styles.cardFrameHovered,
                    ]}
                  >
                    <Image
                      accessibilityLabel={item.title}
                      resizeMode="cover"
                      source={item.image}
                      style={[
                        styles.cardImage,
                        item.imageRotate
                          ? { transform: [{ rotate: item.imageRotate }] }
                          : null,
                      ]}
                    />

                    <View style={styles.cardShade} />

                    <View style={styles.cardInfo}>
                      <Text style={styles.cardCategory}>{item.category}</Text>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>

      <Modal
        animationType="none"
        onRequestClose={hideLightbox}
        transparent
        visible={Boolean(activeItem)}
      >
        {activeItem ? (
          <View style={styles.lightboxRoot}>
            <Animated.View
              style={[
                styles.lightboxBackdrop,
                { opacity: lightboxAnimation },
              ]}
            />

            <Pressable onPress={hideLightbox} style={styles.lightboxPressZone} />

            <Animated.View
              style={[
                styles.lightboxContent,
                isCompact && styles.lightboxContentCompact,
                {
                  opacity: lightboxAnimation,
                  transform: [
                    {
                      scale: lightboxAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.94, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Pressable
                onHoverIn={() => setCloseHovered(true)}
                onHoverOut={() => setCloseHovered(false)}
                onPress={hideLightbox}
                style={[
                  styles.closeButton,
                  closeHovered && styles.closeButtonHovered,
                ]}
              >
                <AppIcon color="#FFFFFF" name="close" size={22} />
              </Pressable>

              <View
                style={[
                  styles.lightboxMediaPane,
                  isCompact && styles.lightboxMediaPaneCompact,
                ]}
              >
                <Image
                  accessibilityLabel={activeItem.title}
                  resizeMode="cover"
                  source={activeItem.image}
                  style={styles.lightboxImage}
                />
              </View>

              <View
                style={[
                  styles.lightboxInfoPane,
                  isCompact && styles.lightboxInfoPaneCompact,
                ]}
              >
                <Text style={styles.lightboxYear}>{activeItem.year}</Text>
                <Text
                  style={[
                    styles.lightboxTitle,
                    isCompact && styles.lightboxTitleCompact,
                  ]}
                >
                  {activeItem.title}
                </Text>
                <Text style={styles.lightboxBody}>{activeItem.caption}</Text>

                <View style={styles.lightboxMetaRow}>
                  <View style={styles.lightboxMetaBadge}>
                    <AppIcon
                      color={palette.purple}
                      name="star-four-points-outline"
                      size={20}
                    />
                  </View>

                  <View style={styles.lightboxMetaCopy}>
                    <Text style={styles.lightboxMetaLabel}>
                      Curated Milestone
                    </Text>
                    <Text style={styles.lightboxMetaValue}>
                      A visual snapshot from the portfolio journey.
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>
        ) : null}
      </Modal>
    </View>
  );
}

export default memo(PhotoRingSection);
