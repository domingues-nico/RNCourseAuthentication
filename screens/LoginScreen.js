import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuthStore } from "../store/authStore";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authenticate = useAuthStore().authenticate;

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Loging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
