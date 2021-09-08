import React from "react";
import { Text } from "react-native-paper";
import { appColors } from "../styles/appTheme";

const ErrorInputText: React.FC = (props) => {
  return (
    <Text
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontStyle: "italic",
        marginVertical: 8,
        color: appColors.error,
      }}
    >
      {props.children}
    </Text>
  );
};

export default ErrorInputText;
