import React from "react";
import { ScrollView, Dimensions } from "react-native";
import { appColors } from "../styles/appTheme";

const AuthPagesContainer: React.FC = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: appColors.background,
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      {props.children}
    </ScrollView>
  );
};
export default AuthPagesContainer;
