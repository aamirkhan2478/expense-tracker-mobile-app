import axios from "axios";
import { useRouter } from "expo-router";

const baseURL = "https://myexpensetrackerapp.vercel.app/api";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Handle any error status codes
    const router = useRouter(); // Use the router to redirect

    if (error.response.status === 401) {
      // Redirect to the sign-in page
      router.replace("/sign-in"); // Adjust this to the actual path for your sign-in page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
