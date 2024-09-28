import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useToken = () => {
  // create get and set token functions
  const [token, setToken] = useState(null);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      return setToken(value);
    } catch (e) {
      console.log(e);
    }
  };

  const addToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return { token, addToken, removeToken };
};

export default useToken;
