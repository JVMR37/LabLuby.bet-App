import React from "react";

import { Text } from "react-native-paper";
import { AuthStatus, UpdateStatus } from "../store/authSlice";
import { appColors } from "../styles/appTheme";

const AuthStatusMessage: React.FC<{ status: AuthStatus }> = (props) => {
  let color: string;
  switch (props.status) {
    case AuthStatus.Loading:
      color = appColors.secondary;
      break;

    case AuthStatus.Success:
      color = appColors.primary;
      break;

    case AuthStatus.Error:
      color = appColors.error;
      break;

    default:
      color = appColors.secondary;
      break;
  }

  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        fontStyle: "italic",
        color,
        marginVertical: 18
      }}
    >
      {props.children}
    </Text>
  );
};

export default AuthStatusMessage;
