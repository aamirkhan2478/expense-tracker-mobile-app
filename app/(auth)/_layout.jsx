import React from "react";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="information"
        options={{
          headerTitle: () => null,
          headerRight: () => <ThemeToggle />,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
