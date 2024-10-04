import React, { useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useLocalStorage from "~/hooks/useLocalStorage";
import { useRouter } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button } from "~/components/ui/button";
import { Text as ButtonText } from "~/components/ui/text";
import { H2, P } from "~/components/ui/typography";
import { useColorScheme } from "~/lib/useColorScheme";
import Dialog from "~/components/Dialog";

const Profile = () => {
  const snapPoints = useMemo(() => ["35%"], []);
  const { isDarkColorScheme } = useColorScheme();

  const bottomSheetRef = useRef(null);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const { removeValue: removeToken } = useLocalStorage("token");
  const { removeValue: removeUser, value: user } = useLocalStorage("userData");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const userData = user && JSON.parse(user);

  const handleLogout = () => {
    removeToken();
    removeUser();

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5] dark:bg-black px-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Dialog
          actionText={"Okay"}
          cancelText={"Cancel"}
          openDialog={isOpen}
          desc={"This feature is coming soon"}
          title={"Note"}
          closeDialog={() => setIsOpen(false)}
          onPress={() => setIsOpen(false)}
        />
        {/* Profile Header */}
        <View className="flex-row justify-between items-center mt-6">
          <View className="flex-row items-center">
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/44.jpg",
              }}
              className="h-20 w-20 rounded-full border-4 border-primary"
            />
            <View className="ml-4">
              <P className="text-sm text-gray-500 dark:text-white">Username</P>
              <H2 className="text-2xl font-bold text-black dark:text-white">
                {userData?.name}
              </H2>
            </View>
          </View>
          <TouchableOpacity
            className="bg-gray-300 p-2 rounded-full"
            onPress={() => setIsOpen(true)}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color={"#7f3dff"}
            />
          </TouchableOpacity>
        </View>

        {/* Options */}
        <View className="mt-8">
          <OptionItem
            icon="logout"
            label="Logout"
            iconColor="#FF4C4C"
            bgColor="bg-destructive"
            onPress={handleOpenPress}
          />
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={{ borderRadius: 20 }}
        backgroundStyle={{
          backgroundColor: isDarkColorScheme ? "#1E293B" : "white",
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkColorScheme ? "#7f3dff" : "#C6C6C6",
        }}
      >
        <BottomSheetView className="flex-1 items-center">
          <Text className={`text-lg ${isDarkColorScheme && "text-white"}`}>
            Are you sure you want to log out?
          </Text>
          <View className="mt-4 w-full flex-row justify-center gap-5">
            <Button onPress={handleLogout}>
              <ButtonText>Yes</ButtonText>
            </Button>
            <Button variant="secondary" onPress={handleClosePress}>
              <ButtonText>No</ButtonText>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const OptionItem = ({ icon, label, iconColor, bgColor, onPress }) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 mb-4 rounded-lg ${bgColor}`}
      onPress={onPress}
    >
      <View className="h-10 w-10 bg-white rounded-lg items-center justify-center mr-4">
        <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
      </View>
      <Text className="text-lg font-semibold">{label}</Text>
    </TouchableOpacity>
  );
};

export default Profile;
