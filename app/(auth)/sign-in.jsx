import React, { useState } from "react";
import { Link } from "expo-router";
import { Input, Button, YStack, Text, Image, View } from "tamagui";
import { login } from "@/constants/images";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <Image src={login} width={250} height={250} />
      <Text fontSize="$6" fontWeight="bold">
        Login
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        width={250}
        mb="$2"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        width={250}
        mb="$4"
      />

      <Button
        onPress={handleLogin}
        width={250}
        themeInverse
        backgroundColor={"#443399"}
      >
        Login
      </Button>
      <View display="flex" flexDirection="row" gap={2}>
        <Text fontSize="$4" fontWeight="bold">
          Don't have an account?
        </Text>
        <Link href="/sign-up">Sign Up</Link>
      </View>
      <Link
        href="/forget-password"
        style={{
          fontWeight: "bold",
          color: "#443399",
          textDecorationLine: "underline",
        }}
      >
        Forget Password
      </Link>
    </YStack>
  );
};

export default SignIn;
