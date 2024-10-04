import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { value: token } = useLocalStorage("token");
  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      // Redirect only if no token and it’s confirmed as null (not undefined)
      router.replace("/sign-in");
    }
  }, [token, router]);

  // If token exists, render the protected content
  if (token) {
    return children;
  }

  // Return null while redirecting if token is null
  return null;
};

export default ProtectedRoute;
