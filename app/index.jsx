import React from "react";
import { Redirect } from "expo-router";
import useLocalStorage from "../hooks/useLocalStorage";
import { ActivityIndicator, View } from "react-native";

const App = () => {
  const { value: token, loading } = useLocalStorage("token");

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={token ? "/home" : "/information"} />;
};

export default App;
