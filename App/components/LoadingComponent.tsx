import React from "react";

import { ActivityIndicator, View } from "react-native";
import { appColors } from "../styles/appTheme";

const LoadingComponent: React.FC = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffffcc",
        minWidth: "100%",
        minHeight: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
        color={appColors.primary}
      ></ActivityIndicator>
    </View>
  );
};

export default LoadingComponent;
