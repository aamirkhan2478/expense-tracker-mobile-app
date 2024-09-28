import { useMutation } from "@tanstack/react-query";
import axios from "@/utils/axiosInstance";

const signUp = (data) => {
  return axios.post("/auth", data);
};

const useSignUp = () => {
  return useMutation({
    mutationFn: () => signUp(),
  });
};

export { useSignUp };
