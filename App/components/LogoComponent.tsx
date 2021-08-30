import React from "react";
import { View, Text } from "react-native";
import {
  LogoLine,
  LogoContainer,
  LogoTextStyled,
} from "../styles/LogoComponent.style";

export default function LogoComponent() {
  return (
    <LogoContainer>
      <LogoTextStyled>TGL</LogoTextStyled>
      <LogoLine />
    </LogoContainer>
  );
}
