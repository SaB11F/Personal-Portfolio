import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      return undefined;
    }

    const fontPreconnect = document.createElement("link");
    fontPreconnect.rel = "preconnect";
    fontPreconnect.href = "https://fonts.googleapis.com";

    const fontPreconnectCross = document.createElement("link");
    fontPreconnectCross.rel = "preconnect";
    fontPreconnectCross.href = "https://fonts.gstatic.com";
    fontPreconnectCross.crossOrigin = "anonymous";

    const fontStylesheet = document.createElement("link");
    fontStylesheet.rel = "stylesheet";
    fontStylesheet.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";

    document.head.appendChild(fontPreconnect);
    document.head.appendChild(fontPreconnectCross);
    document.head.appendChild(fontStylesheet);

    return () => {
      fontPreconnect.remove();
      fontPreconnectCross.remove();
      fontStylesheet.remove();
    };
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default RootLayout;
