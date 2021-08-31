import React from "react";
import { ScrollView, Dimensions } from "react-native";

const AuthPagesContainer: React.FC = (props) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        minHeight: windowHeight,
      }}
    >
      {props.children}
    </ScrollView>
  );
};
export default AuthPagesContainer;
