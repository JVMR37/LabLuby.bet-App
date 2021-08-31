import React from "react";
import { Text } from "react-native";
import { appColors } from "../styles/appTheme";

const Footer: React.FC = () => (
  <Text
    style={{
      position: "absolute",
      bottom: 15,
      margin: "auto",
      width: "100%",
      textAlign: "center",
      color: appColors.secondary,
    }}
  >
    Copyright 2020 Luby Software
  </Text>
);

export default Footer;
