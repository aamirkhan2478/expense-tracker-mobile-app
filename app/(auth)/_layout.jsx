import React from "react";
import { Stack } from "expo-router";
// import { Button, Theme, YStack } from "tamagui";
// import { useColorScheme } from "react-native";

const AuthLayout = () => {
  // const colorScheme = useColorScheme();
  // const [theme, setTheme] = useState(colorScheme || "light");

  // const toggleTheme = () => {
  //   setTheme((prev) => (prev === "light" ? "dark" : "light"));
  // };
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default AuthLayout;
