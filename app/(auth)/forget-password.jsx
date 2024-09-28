import React, { useState } from "react";
import { Link } from "expo-router";
import { Input, Button, YStack, Text, Image, View } from "tamagui";
import { forget } from "@/constants/images";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <Image src={forget} width={250} height={250} />
      <Text fontSize="$6" fontWeight="bold">
        Forget Password
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        width={250}
        mb="$2"
      />

      <Button
        onPress={handleLogin}
        width={250}
        themeInverse
        backgroundColor={"#443399"}
      >
        Forget Password
      </Button>
      <Link
        href="/sign-in"
        style={{
          fontWeight: "bold",
          color: "#443399",
          textDecorationLine: "underline",
        }}
      >
        Go to Login
      </Link>
    </YStack>
  );
};

export default ForgetPassword;
