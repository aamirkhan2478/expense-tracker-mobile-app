import React from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useLocalStorage from "~/hooks/useLocalStorage";
import { Loader2 } from "~/lib/icons/Loader";
import { View } from "react-native";
import { H4, P } from "~/components/ui/typography";
import { useColorScheme } from "~/lib/useColorScheme";
const CustomDrawerContent = (props) => {
  const { isDarkColorScheme } = useColorScheme();
  const pathname = usePathname();
  const { value, loading } = useLocalStorage("userData");
  const user = value && JSON.parse(value);

  return (
    <DrawerContentScrollView {...props}>
      <View className="justify-center items-center border-b-1">
        <MaterialCommunityIcons
          name="account-circle"
          size={150}
          color="#7f3dff"
          style={{
            marginTop: 20,
            borderRadius: 50,
          }}
        />
        {loading ? (
          <Loader2 />
        ) : (
          <>
            <H4
              fontWeight={"bold"}
              fontSize={20}
              className={isDarkColorScheme ? "text-white" : "text-black"}
            >
              {user?.name}
            </H4>
            <P
              marginBottom={10}
              className={isDarkColorScheme ? "text-white" : "text-black"}
            >
              {user?.email}
            </P>
          </>
        )}
      </View>
      <DrawerItem
        label="Home"
        onPress={() => router.push("/(drawer)/(tabs)/home")}
        labelStyle={{
          color:
            pathname === "/home"
              ? isDarkColorScheme
                ? "#ffffff"
                : "#000000"
              : isDarkColorScheme
                ? "#ffffff"
                : "#000000",
          marginLeft: -20,
          fontSize: 15,
        }}
        style={{
          backgroundColor:
            pathname === "/home"
              ? "#7f3dff"
              : isDarkColorScheme
                ? "#1E293B"
                : "#ffffff",
          marginTop: 20,
        }}
        icon={() => (
          <MaterialCommunityIcons
            name={
              pathname === "/home" ? "home-variant" : "home-variant-outline"
            }
            color={
              pathname === "/home"
                ? isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
                : isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
            }
            size={20}
          />
        )}
      />
      <DrawerItem
        label="Categories"
        onPress={() => router.push("/(drawer)/(tabs)/categories")}
        labelStyle={{
          color:
            pathname === "/categories"
              ? isDarkColorScheme
                ? "#ffffff"
                : "#000000"
              : isDarkColorScheme
                ? "#ffffff"
                : "#000000",
          marginLeft: -20,
          fontSize: 15,
        }}
        style={{
          backgroundColor:
            pathname === "/categories"
              ? "#7f3dff"
              : isDarkColorScheme
                ? "#1E293B"
                : "#ffffff",
        }}
        icon={() => (
          <MaterialCommunityIcons
            name={
              pathname === "/categories"
                ? "format-list-bulleted-type"
                : "format-list-bulleted"
            }
            color={
              pathname === "/categories"
                ? isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
                : isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
            }
            size={20}
          />
        )}
      />
      <DrawerItem
        label="Income"
        onPress={() => router.push("/(drawer)/(tabs)/income")}
        labelStyle={{
          color:
            pathname === "/income"
              ? isDarkColorScheme
                ? "#ffffff"
                : "#000000"
              : isDarkColorScheme
                ? "#ffffff"
                : "#000000",
          marginLeft: -20,
          fontSize: 15,
        }}
        style={{
          backgroundColor:
            pathname === "/income"
              ? "#7f3dff"
              : isDarkColorScheme
                ? "#1E293B"
                : "#ffffff",
        }}
        icon={() => (
          <MaterialCommunityIcons
            name={pathname === "/income" ? "compass" : "compass-outline"}
            color={
              pathname === "/income"
                ? isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
                : isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
            }
            size={20}
          />
        )}
      />
      <DrawerItem
        label="Expenses"
        onPress={() => router.push("/(drawer)/(tabs)/expenses")}
        labelStyle={{
          color:
            pathname === "/expenses"
              ? isDarkColorScheme
                ? "#ffffff"
                : "#000000"
              : isDarkColorScheme
                ? "#ffffff"
                : "#000000",
          marginLeft: -20,
          fontSize: 15,
        }}
        style={{
          backgroundColor:
            pathname === "/expenses"
              ? "#7f3dff"
              : isDarkColorScheme
                ? "#1E293B"
                : "#ffffff",
        }}
        icon={() => (
          <MaterialCommunityIcons
            name={
              pathname === "/expenses" ? "chart-line-stacked" : "chart-line"
            }
            color={
              pathname === "/expenses"
                ? isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
                : isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
            }
            size={20}
          />
        )}
      />
      <DrawerItem
        label="Profile"
        onPress={() => router.push("/(drawer)/(tabs)/profile")}
        labelStyle={{
          color:
            pathname === "/profile"
              ? isDarkColorScheme
                ? "#ffffff"
                : "#000000"
              : isDarkColorScheme
                ? "#ffffff"
                : "#000000",
          marginLeft: -20,
          fontSize: 15,
        }}
        style={{
          backgroundColor:
            pathname === "/profile"
              ? "#7f3dff"
              : isDarkColorScheme
                ? "#1E293B"
                : "#ffffff",
        }}
        icon={() => (
          <MaterialCommunityIcons
            name={pathname === "/profile" ? "account" : "account-outline"}
            color={
              pathname === "/profile"
                ? isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
                : isDarkColorScheme
                  ? "#ffffff"
                  : "#000000"
            }
            size={20}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};

const _layout = () => {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          marginTop: 30,
          height: "100px",
          width: "75%",
          backgroundColor: isDarkColorScheme ? "#1E293B" : "#ffffff",
          borderTopRightRadius: 20,
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    />
  );
};

export default _layout;
