import { StatusBar } from "expo-status-bar";
import React from "react";
import useToken from "../../hooks/useToken";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const Home = () => {
  const { removeToken } = useToken();
  const router = useRouter();

  return (
    <View>
      <Text>Home</Text>
      <StatusBar style="auto" />
      <Pressable
        onPress={() => {
          removeToken();
          router.push("/sign-in");
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;
