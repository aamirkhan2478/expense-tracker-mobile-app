import React from "react";
import { Easing, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import HomeScreen from "./home";
import IncomeScreen from "./income";
import ExpenseScreen from "./expenses";
import ProfileScreen from "./profile";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useColorScheme } from "~/lib/useColorScheme";
const Tab = createBottomTabNavigator();

const AuthLayout = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          backgroundColor: isDarkColorScheme ? "#1E293B" : "white",
          shadowColor: "transparent",
          elevation: 0,
          height: 70,
          shadowOffset: {
            width: 0,
            height: 2,
          },
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "home") {
            iconName = focused ? "home-variant" : "home-variant-outline";
          } else if (route.name === "income") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "expenses") {
            iconName = focused ? "chart-line-stacked" : "chart-line";
          } else if (route.name === "profile") {
            iconName = focused ? "account" : "account-outline";
          }

          return (
            <View className="justify-center items-center">
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={focused ? "#7f3dff" : "#C6C6C6"}
              />
              <Text
                className={`${isDarkColorScheme ? "text-white" : "text-black"} ${focused ? "text-[#7f3dff]" : "text-[#C6C6C6]"} text-xs`}
              >
                {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
              </Text>
            </View>
          );
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 16,
          right: 16,
          height: 72,
          elevation: 0,
          backgroundColor: isDarkColorScheme ? "#1E293B" : "white",
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarActiveTintColor: "#7f3dff",
        tabBarInactiveTintColor: "#C6C6C6",
        headerLeft: () => <DrawerToggleButton tintColor="#7f3dff" />,
        headerRight: () => <ThemeToggle />,

        animation: ({ current, next }) => {
          return {
            transitionSpec: {
              duration: 500,
              easing: Easing.out(Easing.exp),
            },
            screenInterpolator: ({ layout, position, scene }) => {
              const { index } = scene;
              const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [-layout.initWidth, 0, layout.initWidth],
              });
              return { transform: [{ translateX }] };
            },
          };
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
          tabBarLabel: () => null,
          headerTitle: "Home",
        }}
      />
      <Tab.Screen
        name="income"
        component={IncomeScreen}
        options={{
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
          tabBarLabel: () => null,
          headerTitle: "Income",
        }}
      />

      <Tab.Screen
        name="add" // This will hold the '+' button
        component={IncomeScreen} // You can use any screen here
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: focused ? "#7f3dff" : "#C6C6C6",
                marginBottom: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
            </View>
          ),
          tabBarLabel: () => null,
          headerTitle: () => null,
        }}
      />
      <Tab.Screen
        name="expenses"
        component={ExpenseScreen}
        options={{
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
          tabBarLabel: () => null,
          headerTitle: "Expenses",
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
          tabBarLabel: () => null,
          headerTitle: "Profile",
        }}
      />
      <Tab.Screen
        name="categories"
        component={ProfileScreen}
        options={{
          tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
          tabBarLabel: () => null,
          headerTitle: "Categories",
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthLayout;
