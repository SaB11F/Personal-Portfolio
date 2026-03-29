import { Pressable, View } from "react-native";

import { AppIcon } from "../../common";
import { styles } from "./HeroSection.style";

function OrbitControlButton({ isCompact, label, onPress }) {
  return (
    <Pressable
      accessibilityLabel={label}
      onPress={onPress}
      style={[
        styles.orbitControlDock,
        isCompact && styles.orbitControlDockCompact,
      ]}
    >
      <View
        style={[
          styles.orbitControlButton,
          isCompact && styles.orbitControlButtonCompact,
        ]}
      >
        <AppIcon
          color="#FFFFFF"
          name="arrow-right"
          size={isCompact ? 24 : 28}
        />
      </View>
    </Pressable>
  );
}

export default OrbitControlButton;
