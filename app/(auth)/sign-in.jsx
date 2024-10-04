import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { login } from "~/constants/images";
import { useSignIn } from "~/hooks/useAuth";
import { useToast } from "react-native-toast-notifications";
import { Image, ScrollView, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import useLocalStorage from "~/hooks/useLocalStorage";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Input } from "~/components/ui/input";
import { Eye } from "~/lib/icons/Eye";
import { EyeOff } from "~/lib/icons/EyeOff";
import { Loader2 } from "~/lib/icons/Loader";
import { H1 } from "~/components/ui/typography";
import { ThemeToggle } from "~/components/ThemeToggle";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true); // new state to toggle show password
  const { mutate, isPending } = useSignIn();
  const { setStorageValue: setToken } = useLocalStorage("token");
  const { setStorageValue: setUser } = useLocalStorage("userData");
  const router = useRouter();
  const toast = useToast();

  const handleLogin = () => {
    const data = { email, password };

    mutate(data, {
      onSuccess: (data) => {
        const user = JSON.stringify(data.data.user);
        setToken(data.data.token);
        setUser(user);
        setEmail("");
        setPassword("");
        router.replace("/home");
      },

      onError: (error) => {
        toast.show(error.response.data.error, {
          type: "danger",
          placement: "top",
          dangerIcon: <Feather name="alert-circle" size={24} color="white" />,
          animationType: "zoom-in",
          duration: 3000,
          offset: 20,
          style: {
            marginTop: 30,
          },
        });
      },
    });
  };

  // Animation value for card
  const translateY = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    };
  });

  // Trigger animation on mount
  useEffect(() => {
    translateY.value = 0; // Slide in
  }, [translateY]);

  return (
    <ScrollView className="bg-[#E5E5E5] dark:bg-black flex-1">
      {/* Hero image */}
      <AnimatedImage
        source={login}
        className={`w-[350px] h-[350px] mx-auto`}
        resizeMode="cover"
      />

      {/* Animated card */}
      <Animated.View
        style={animatedStyle}
        className="bg-white p-6 mx-4 rounded-2xl shadow-lg dark:bg-[#1E293B] dark:text-white mb-5"
      >
        <View className="flex-row justify-end">
          <ThemeToggle />
        </View>
        <H1 className="text-3xl font-bold text-center mb-4 dark:text-white">
          Welcome Back!
        </H1>
        <Text className="text-center text-gray-600 mb-6 dark:text-gray-300">
          Sign in to continue
        </Text>

        {/* Input fields */}
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="mb-4 border-gray-300 rounded-lg px-4 py-3"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View className="relative">
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={showPassword}
            className="mb-4 border-gray-300 rounded-lg px-4 py-3"
          />
          {showPassword ? (
            <Eye
              className="absolute top-[20%] left-[90%] right-3 text-gray-500"
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeOff
              className="absolute top-[20%] left-[90%] right-3 text-gray-500"
              onPress={() => setShowPassword(!showPassword)}
            />
          )}
        </View>

        {/* Sign-in Button */}
        <Button onPress={handleLogin}>
          <Text className="flex justify-center items-center gap-4">
            {isPending ? (
              <Loader2 className="animate-spin" color={"white"} />
            ) : (
              "Sign In"
            )}
          </Text>
        </Button>

        {/* Sign-up link */}
        <Text
          className="text-center text-blue-500 mt-6"
          onPress={() => router.push("/sign-up")}
        >
          Don't have an account? Sign Up
        </Text>
      </Animated.View>
    </ScrollView>
  );
};

export default SignIn;
