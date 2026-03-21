import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { styles } from "./HeroSection.style";

function getGhostColor(theme) {
  if (theme === "dark") {
    return "rgba(255, 255, 255, 0.12)";
  }

  if (theme === "soft") {
    return "rgba(152, 37, 152, 0.12)";
  }

  return "rgba(152, 37, 152, 0.1)";
}

function getAssistantPalette(theme) {
  if (theme === "dark") {
    return {
      stroke: "rgba(196, 200, 244, 0.26)",
      feature: "rgba(196, 200, 244, 0.24)",
    };
  }

  if (theme === "soft") {
    return {
      stroke: "rgba(152, 37, 152, 0.16)",
      feature: "rgba(152, 37, 152, 0.16)",
    };
  }

  return {
    stroke: "rgba(21, 23, 61, 0.12)",
    feature: "rgba(21, 23, 61, 0.12)",
  };
}

function getVendingPalette(theme) {
  if (theme === "dark") {
    return {
      shell: "rgba(196, 200, 244, 0.18)",
      stroke: "rgba(196, 200, 244, 0.28)",
      glass: "rgba(196, 200, 244, 0.1)",
      feature: "rgba(196, 200, 244, 0.24)",
      accent: "rgba(255, 188, 228, 0.26)",
      accentSoft: "rgba(255, 188, 228, 0.16)",
    };
  }

  if (theme === "soft") {
    return {
      shell: "rgba(255, 255, 255, 0.2)",
      stroke: "rgba(152, 37, 152, 0.16)",
      glass: "rgba(255, 255, 255, 0.18)",
      feature: "rgba(152, 37, 152, 0.16)",
      accent: "rgba(228, 145, 201, 0.18)",
      accentSoft: "rgba(228, 145, 201, 0.12)",
    };
  }

  return {
    shell: "rgba(21, 23, 61, 0.08)",
    stroke: "rgba(21, 23, 61, 0.12)",
    glass: "rgba(21, 23, 61, 0.06)",
    feature: "rgba(21, 23, 61, 0.12)",
    accent: "rgba(228, 145, 201, 0.16)",
    accentSoft: "rgba(228, 145, 201, 0.1)",
  };
}

function getPlantPalette(theme) {
  if (theme === "dark") {
    return {
      pot: "rgba(196, 200, 244, 0.16)",
      potEdge: "rgba(196, 200, 244, 0.26)",
      leaf: "rgba(163, 232, 172, 0.22)",
      leafEdge: "rgba(163, 232, 172, 0.3)",
      stem: "rgba(163, 232, 172, 0.24)",
      accent: "rgba(255, 188, 228, 0.18)",
    };
  }

  if (theme === "soft") {
    return {
      pot: "rgba(255, 255, 255, 0.18)",
      potEdge: "rgba(152, 37, 152, 0.16)",
      leaf: "rgba(126, 184, 118, 0.18)",
      leafEdge: "rgba(126, 184, 118, 0.24)",
      stem: "rgba(126, 184, 118, 0.2)",
      accent: "rgba(228, 145, 201, 0.16)",
    };
  }

  return {
    pot: "rgba(21, 23, 61, 0.08)",
    potEdge: "rgba(21, 23, 61, 0.12)",
    leaf: "rgba(126, 184, 118, 0.14)",
    leafEdge: "rgba(126, 184, 118, 0.22)",
    stem: "rgba(126, 184, 118, 0.18)",
    accent: "rgba(228, 145, 201, 0.14)",
  };
}

function AssistantFigure({ theme }) {
  const colors = getAssistantPalette(theme);

  return (
    <View style={styles.assistantGhostFrame}>
      <View
        style={[
          styles.assistantGhostCap,
          {
            backgroundColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.assistantGhostSideTab,
          {
            backgroundColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.assistantGhostHead,
          {
            borderColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.assistantGhostEyeLeft,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.assistantGhostEyeRight,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.assistantGhostMouth,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
    </View>
  );
}

function PlantPotFigure({ theme }) {
  const colors = getPlantPalette(theme);

  return (
    <View style={styles.plantGhostFrame}>
      <View
        style={[
          styles.plantGhostLeafBackLeft,
          {
            backgroundColor: colors.leaf,
            borderColor: colors.leafEdge,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostLeafBackRight,
          {
            backgroundColor: colors.leaf,
            borderColor: colors.leafEdge,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostStemLeft,
          {
            backgroundColor: colors.stem,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostStemRight,
          {
            backgroundColor: colors.stem,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostLeafFrontLeft,
          {
            backgroundColor: colors.leaf,
            borderColor: colors.leafEdge,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostLeafCenter,
          {
            backgroundColor: colors.leaf,
            borderColor: colors.leafEdge,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostLeafFrontRight,
          {
            backgroundColor: colors.leaf,
            borderColor: colors.leafEdge,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostPotRim,
          {
            backgroundColor: colors.accent,
            borderColor: colors.potEdge,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostPotBody,
          {
            backgroundColor: colors.pot,
            borderColor: colors.potEdge,
          },
        ]}
      />
      <View
        style={[
          styles.plantGhostPotBase,
          {
            backgroundColor: colors.pot,
            borderColor: colors.potEdge,
          },
        ]}
      />
    </View>
  );
}

function VendingMachineFigure({ theme }) {
  const colors = getVendingPalette(theme);

  return (
    <View style={styles.vendingGhostFrame}>
      <View
        style={[
          styles.vendingGhostBody,
          {
            backgroundColor: colors.shell,
            borderColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostTopStrip,
          {
            backgroundColor: colors.accent,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostBrandBadge,
          {
            backgroundColor: colors.accentSoft,
            borderColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostWindow,
          {
            backgroundColor: colors.glass,
            borderColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostShelfOne,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostShelfTwo,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostShelfThree,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostShelfFour,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostShelfFive,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostProductA,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostProductB,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostProductC,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostProductD,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostProductE,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostProductF,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostPanel,
          {
            backgroundColor: colors.glass,
            borderColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostDisplay,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostKeypad,
          {
            borderColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostCoinSlot,
          {
            backgroundColor: colors.feature,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostHandle,
          {
            backgroundColor: colors.accent,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostBase,
          {
            backgroundColor: colors.shell,
            borderColor: colors.stroke,
          },
        ]}
      />
      <View
        style={[
          styles.vendingGhostDispenseDoor,
          {
            backgroundColor: colors.glass,
            borderColor: colors.stroke,
          },
        ]}
      />
    </View>
  );
}

function OrbitGhostArtwork({ ghost, isWide, theme }) {
  if (!ghost) {
    return null;
  }

  const size = isWide ? ghost.sizeWide ?? 214 : ghost.sizeCompact ?? 128;
  const offsetX = isWide ? ghost.offsetWide ?? 44 : ghost.offsetCompact ?? 22;
  const offsetY = isWide ? ghost.yWide ?? 0 : ghost.yCompact ?? 0;
  const scale = isWide ? ghost.scaleWide ?? 1 : ghost.scaleCompact ?? 0.7;

  return (
    <View pointerEvents="none" style={styles.orbitGhostMask}>
      {ghost.shape === "assistant-figure" ? (
        <View
          style={[
            styles.orbitGhostFigureWrap,
            {
              transform: [
                { translateX: offsetX },
                { translateY: offsetY },
                { scale },
              ],
            },
          ]}
        >
          <AssistantFigure theme={theme} />
        </View>
      ) : ghost.shape === "plant-pot-figure" ? (
        <View
          style={[
            styles.orbitGhostFigureWrap,
            {
              transform: [
                { translateX: offsetX },
                { translateY: offsetY },
                { scale },
              ],
            },
          ]}
        >
          <PlantPotFigure theme={theme} />
        </View>
      ) : ghost.shape === "vending-figure" ? (
        <View
          style={[
            styles.orbitGhostFigureWrap,
            {
              transform: [
                { translateX: offsetX },
                { translateY: offsetY },
                { scale },
              ],
            },
          ]}
        >
          <VendingMachineFigure theme={theme} />
        </View>
      ) : (
        <MaterialCommunityIcons
          color={getGhostColor(theme)}
          name={ghost.icon}
          size={size}
          style={[
            styles.orbitGhostIcon,
            {
              transform: [{ translateX: offsetX }, { translateY: offsetY }],
            },
          ]}
        />
      )}
    </View>
  );
}

export default OrbitGhostArtwork;
