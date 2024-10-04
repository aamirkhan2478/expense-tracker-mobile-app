import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { register } from "~/constants/images";
import { useToast } from "react-native-toast-notifications";
import { Feather } from "@expo/vector-icons";
import { useSignUp } from "~/hooks/useAuth";
import useLocalStorage from "~/hooks/useLocalStorage";
import { Image, ScrollView, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Eye } from "~/lib/icons/Eye";
import { EyeOff } from "~/lib/icons/EyeOff";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Loader2 } from "~/lib/icons/Loader";
import { H1 } from "~/components/ui/typography";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConformPassword, setShowConformPassword] = useState(true);
  const { mutate, isPending } = useSignUp();
  const { setStorageValue: setToken } = useLocalStorage("token");
  const { setStorageValue: setUser } = useLocalStorage("userData");
  const toast = useToast();
  const router = useRouter();

  const handleSignUp = () => {
    // Handle sign up logic here
    if (password !== conformPassword) {
      return toast.show("Password doesn't match", {
        type: "danger",
        dangerIcon: <Feather name="alert-circle" size={24} color="white" />,
        placement: "top",
        duration: 3000,
        offset: 20,
        style: {
          marginTop: 30,
        },
      });
    }

    const data = { name, email, password };

    mutate(data, {
      onSuccess: (data) => {
        setToken(data.data.token);
        setUser(JSON.stringify(data.data.userData));
        setEmail("");
        setName("");
        setPassword("");
        setConformPassword("");
        router.replace("/home");
      },

      onError: (error) => {
        console.log(error);

        toast.show(error.data.data, {
          type: "danger",
          dangerIcon: <Feather name="alert-circle" size={24} color="white" />,
          placement: "top",
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
        source={register}
        className={`w-[350px] h-[350px] mx-auto`}
        resizeMode="cover"
        animatedStyle={animatedStyle}
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
          Create an account
        </H1>
        <Text className="text-center text-gray-600 mb-6 dark:text-gray-300">
          Sign up to continue
        </Text>

        {/* Input fields */}
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Name"
          className="mb-4 border-gray-300 rounded-lg px-4 py-3"
        />
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="mb-4 border-gray-300 rounded-lg px-4 py-3"
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
        <View className="relative">
          <Input
            value={conformPassword}
            onChangeText={setConformPassword}
            placeholder="ConformPassword"
            secureTextEntry={showConformPassword}
            className="mb-4 border-gray-300 rounded-lg px-4 py-3"
          />
          {showConformPassword ? (
            <Eye
              className="absolute top-[20%] left-[90%] right-3 text-gray-500"
              onPress={() => setShowConformPassword(!showConformPassword)}
            />
          ) : (
            <EyeOff
              className="absolute top-[20%] left-[90%] right-3 text-gray-500"
              onPress={() => setShowConformPassword(!showConformPassword)}
            />
          )}
        </View>
        {/* Sign-up Button */}
        <Button onPress={handleSignUp}>
          <Text className="justify-center items-center">
            {isPending ? (
              <Loader2 color={"white"} className="animate-spin" />
            ) : (
              "Sign In"
            )}
          </Text>
        </Button>

        {/* Sign-in link */}
        <Text
          className="text-center text-blue-500 mt-6"
          onPress={() => router.push("/sign-in")}
        >
          Have an account? Sign In
        </Text>
      </Animated.View>
    </ScrollView>
  );
};

export default SignUp;
