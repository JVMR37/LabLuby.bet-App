import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text } from "react-native";
import LogoComponent from "../components/LogoComponent";
import { IconButton } from "react-native-paper";
import { useAppDispatch } from "../hooks/hooks";
import { useMountEffect } from "../hooks/use-mount-effect";
import { logout } from "../store/authSlice";
import { loadGames, loadSavedBets } from "../store/gamesSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColors } from "../styles/appTheme";
import NavigationBar from "./NavigationBar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import AccountPage from "../pages/AccountPage";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const AppScaffold: React.FC = (props) => {
  const dispatch = useAppDispatch();

  useMountEffect(() => {
    dispatch(loadGames());
    dispatch(loadSavedBets({ page: 1 }));
  });

  const logoutButtonHandler = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container} key={"AppScaffold"}>
      <StatusBar style={"auto"} backgroundColor={"white"} />
      <View
        style={{
          ...styles.row,
          ...styles.appBar,
        }}
      >
        <LogoComponent fontSize={28} />
        <IconButton
          icon="logout"
          color={appColors.secondary}
          onPress={logoutButtonHandler}
        ></IconButton>
      </View>
      {/* <ScrollView contentContainerStyle={styles.appContent}> */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <NavigationBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Game" component={GamePage} />
        <Tab.Screen name="Account" component={AccountPage} />
      </Tab.Navigator>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,

    // marginTop: StatusBar.currentHeight,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  appBar: {
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  appContent: {
    marginTop: 20,
    marginBottom: 0,
    paddingBottom: 50,
    marginHorizontal: 16,
  },
});

export default AppScaffold;
