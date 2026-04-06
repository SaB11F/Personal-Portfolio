import { memo, useState } from "react";
import { Platform, Pressable, Text, useWindowDimensions, View } from "react-native";

import { AppIcon } from "../../common";
import { palette } from "../../../lib/theme";
import { styles } from "./HighlightsSection.style";

function HighlightsSection({ education }) {
  const { width } = useWindowDimensions();
  const isPhone = width < 640;
  const cards = education.slice(0, 3);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>Education</Text>
        <View style={styles.headingAccent} />
      </View>

      <View style={styles.gridWrap}>
        <View pointerEvents="none" style={styles.connectorLine} />

        <View style={styles.grid}>
          {cards.map((item, index) => {
            const isPurple = item.accent === "purple";
            const isPink = item.accent === "pink";
            const iconBgStyle = isPurple
              ? styles.iconTilePurple
              : isPink
                ? styles.iconTilePink
                : styles.iconTileNavy;
            const iconColor = isPurple || isPink ? palette.purple : palette.navy;
            const tagStyle = isPurple
              ? styles.tagTextPurple
              : isPink
                ? styles.tagTextPink
                : styles.tagTextNavy;
            const dotStyle = isPurple
              ? styles.tagDotPurple
              : isPink
                ? styles.tagDotPink
                : styles.tagDotNavy;

            return (
              <Pressable
                key={item.school}
                onHoverIn={() => {
                  if (Platform.OS === "web") {
                    setHoveredCard(item.school);
                  }
                }}
                onHoverOut={() => {
                  if (Platform.OS === "web") {
                    setHoveredCard(null);
                  }
                }}
                style={[
                  styles.card,
                  isPhone && styles.cardPhone,
                  !isPhone && index === 1 && styles.cardDelayed,
                  !isPhone && index === 2 && styles.cardDelayedMore,
                  hoveredCard === item.school && styles.cardHover,
                ]}
              >
                <View style={[styles.iconTile, iconBgStyle]}>
                  <AppIcon
                    color={iconColor}
                    name={item.icon || "school-outline"}
                    size={30}
                  />
                </View>

                <View style={styles.titleBlock}>
                  <Text style={styles.phase}>{item.phase || `Phase ${index + 1}`}</Text>
                  <Text style={styles.school}>{item.school}</Text>
                </View>

                <Text style={styles.body}>{item.note}</Text>

                <View style={styles.tagRow}>
                  <View style={[styles.tagDot, dotStyle]} />
                  <Text style={[styles.tagText, tagStyle]}>{item.tag || item.period}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default memo(HighlightsSection);
