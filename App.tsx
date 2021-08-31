import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { appTheme } from "./App/styles/appTheme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./App/pages/LoginPage";
import HomePage from "./App/pages/HomePage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [pseudoToken, setPseudoToken] = React.useState("");

  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          {!pseudoToken ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={LoginPage}
              options={{
                title: "",
                headerShown: false,
                animationTypeForReplace: pseudoToken ? "pop" : "push",
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomePage} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
