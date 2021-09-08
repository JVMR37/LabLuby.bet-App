import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text } from "react-native";
import LogoComponent from "../components/LogoComponent";
import { IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
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
import CartComponent from "../components/CartComponent";
import {
  selectCartItens,
  selectShowCartValue,
  setShowCartValue,
} from "../store/cartSlice";

const Tab = createBottomTabNavigator();

const AppScaffold: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItens = useAppSelector(selectCartItens);

  const showCart = useAppSelector(selectShowCartValue);

  useMountEffect(() => {
    dispatch(loadGames());
    dispatch(loadSavedBets({ page: 1 }));
  });

  const logoutButtonHandler = () => {
    dispatch(logout());
  };

  const cartButtonHandler = () => {
    dispatch(setShowCartValue(!showCart));
  };

  return (
    <SafeAreaView style={styles.container} key={"AppScaffold"}>
      <StatusBar style={"auto"} backgroundColor={"white"} />
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          header: (props) => (
            <View
              style={{
                ...styles.row,
                ...styles.appBar,
              }}
            >
              <LogoComponent fontSize={28} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {props.route.name === "Game" && cartItens.length > 0 && (
                  <IconButton
                    icon="cart-outline"
                    color={appColors.primary}
                    onPress={cartButtonHandler}
                  ></IconButton>
                )}

                <IconButton
                  icon="logout"
                  color={appColors.secondary}
                  onPress={logoutButtonHandler}
                ></IconButton>
              </View>
            </View>
          ),
        }}
        tabBar={(props) => <NavigationBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Game" component={GamePage} />
        <Tab.Screen name="Account" component={AccountPage} />
      </Tab.Navigator>
      {showCart && <CartComponent />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  row: {
    display: "flex",
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
    backgroundColor: appColors.background,
    marginTop: 20,
    marginBottom: 0,
    paddingBottom: 50,
    marginHorizontal: 16,
  },
});

export default AppScaffold;
