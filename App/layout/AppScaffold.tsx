import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import LogoComponent from "../components/LogoComponent";
import { IconButton } from "react-native-paper";
import { useAppDispatch } from "../hooks/hooks";
import { useMountEffect } from "../hooks/use-mount-effect";
import { logout } from "../store/authSlice";
import { loadGames, loadSavedBets } from "../store/gamesSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColors } from "../styles/appTheme";

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
      <View style={styles.appContent}>{props.children}</View>
      <View style={styles.row}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 32,
    marginHorizontal: 16,
  },
});

export default AppScaffold;
