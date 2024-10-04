import { View } from "react-native";
import React from "react";
import Carousel from "~/components/Carousel";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";

const Information = () => {
  const router = useRouter();
  return (
    <View>
      <Carousel />
      {/* Buttons */}
      <View className="px-8 mb-10 gap-5">
        <Button onPress={() => router.push("/sign-up")}>
          <Text>Sign Up</Text>
        </Button>
        <Button variant="secondary" onPress={() => router.push("/sign-in")}>
          <Text>Sign In</Text>
        </Button>
      </View>
    </View>
  );
};

export default Information;
