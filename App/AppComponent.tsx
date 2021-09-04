import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import AppScaffold from "./layout/AppScaffold";
import { useAppSelector } from "./hooks/hooks";
import { selectIsLoggedInValue } from "./store/authSlice";

const Stack = createNativeStackNavigator();

const AppComponent: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedInValue);
  return (
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
  );
};

export default AppComponent;
