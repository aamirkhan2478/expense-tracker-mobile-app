import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const getValue = useCallback(async () => {
    try {
      setLoading(true);
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        setValue(item); // Set the token from localStorage
      } else {
        setValue(null); // Token not found
      }
    } catch (e) {
      console.log(e);
      setValue(null);
    } finally {
      setLoading(false);
    }
  }, [key]);

  const setStorageValue = async (value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getValue();
  }, [getValue]);

  return { value, setStorageValue, removeValue, loading };
};

export default useLocalStorage;
