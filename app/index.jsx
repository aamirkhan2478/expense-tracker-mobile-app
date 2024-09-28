import { Redirect } from "expo-router";
import useToken from "../hooks/useToken";

export default function App() {
  const { token } = useToken();

  return (
    <>
      {token && token ? (
        <Redirect href="/home" />
      ) : (
        <Redirect href="/sign-in" />
      )}
    </>
  );
}
