import React, { useState } from "react";
import { Link } from "expo-router";

import { Image, Text, View } from "react-native";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <View>
      <Text>Forget Password</Text>
    </View>
  );
};

export default ForgetPassword;
