import React from "react";

import { Text } from "react-native-paper";
import { UpdateStatus } from "../store/authSlice";
import { appColors } from "../styles/appTheme";

const UpdateStatusMessage: React.FC<{ status: UpdateStatus }> = (props) => {
  let color: string;
  switch (props.status) {
    case UpdateStatus.Loading:
      color = appColors.secondary;
      break;

    case UpdateStatus.Success:
      color = appColors.primary;
      break;

    case UpdateStatus.Error:
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
        marginVertical: 18,
      }}
    >
      {props.children}
    </Text>
  );
};

export default UpdateStatusMessage;
