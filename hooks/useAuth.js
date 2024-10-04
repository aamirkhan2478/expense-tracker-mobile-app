import { useMutation } from "@tanstack/react-query";
import axios from "../utils/axiosInstance";

const signUp = (data) => {
  return axios.post("/auth", data);
};

const signIn = (data) => {
  return axios.post("/auth/login", data);
};

const useSignUp = () => {
  return useMutation({
    mutationFn: (data) => signUp(data),
  });
};

const useSignIn = () => {
  return useMutation({
    mutationFn: (data) => signIn(data),
  });
};

export { useSignUp, useSignIn };
