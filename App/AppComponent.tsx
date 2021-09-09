import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import AppScaffold from "./layout/AppScaffold";
import { useAppSelector } from "./hooks/hooks";
import { AuthStatus, selectAuthStatusValue } from "./store/authSlice";
import LoadingComponent from "./components/LoadingComponent";

const Stack = createNativeStackNavigator();

const AppComponent: React.FC = () => {
  const authStatus = useAppSelector(selectAuthStatusValue);
  const isLoggedIn = authStatus === AuthStatus.Logged;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={LoginPage}
                options={{
                  headerShown: false,
                  animationTypeForReplace: isLoggedIn ? "pop" : "push",
                }}
              />

              <Stack.Screen
                name="Signup"
                component={SignupPage}
                options={{
                  headerShown: false,
                  animationTypeForReplace: isLoggedIn ? "pop" : "push",
                }}
              />

              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordPage}
                options={{
                  headerShown: false,
                  animationTypeForReplace: isLoggedIn ? "pop" : "push",
                }}
              />
            </>
          ) : (
            // User is signed in
            <>
              <Stack.Screen
                name="AppScaffold"
                component={AppScaffold}
                options={{
                  headerShown: false,
                  animationTypeForReplace: isLoggedIn ? "pop" : "push",
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {authStatus === AuthStatus.Loading && <LoadingComponent />}
    </>
  );
};

export default AppComponent;
