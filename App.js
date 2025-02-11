import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/styles";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { useAuthStore } from "./store/authStore";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const logout = useAuthStore().logout;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const isAuthenticated = useAuthStore().isAuthenticated;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const retrieveAuth = useAuthStore().retrieveAuth;

  useEffect(() => {
    async function fetchInitialData() {
      await retrieveAuth();
      SplashScreen.hideAsync();
    }

    fetchInitialData();
  }, []);

  return (
    <>
      <StatusBar style="light" />

      <Navigation />
    </>
  );
}
