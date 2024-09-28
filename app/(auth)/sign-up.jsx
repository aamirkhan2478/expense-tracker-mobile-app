import React, { useState } from "react";
import { Link } from "expo-router";
import { Input, Button, YStack, Text, Image, View } from "tamagui";
import { register } from "@/constants/images";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const handleSignUp = () => {
    // Handle sign up logic here
  };

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <Image src={register} width={250} height={250} />
      <Text fontSize="$6" fontWeight="bold">
        Sign Up
      </Text>

      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
        width={250}
        mb="$2"
      />
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

      <Input
        placeholder="Conform Password"
        value={conformPassword}
        onChangeText={setConformPassword}
        secureTextEntry
        width={250}
        mb="$4"
      />

      <Button
        onPress={handleSignUp}
        width={250}
        themeInverse
        backgroundColor={"#443399"}
      >
        Sign Up
      </Button>

      <View display="flex" flexDirection="row" gap={2}>
        <Text fontSize="$4" fontWeight="bold">
          Already have an account?
        </Text>
        <Link href="/sign-in">Sign In</Link>
      </View>
    </YStack>
  );
};

export default SignUp;
