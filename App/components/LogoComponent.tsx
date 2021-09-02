import React from "react";
import { View, Text } from "react-native";
import {
  LogoLine,
  LogoContainer,
  LogoTextStyled,
} from "../styles/LogoComponent.style";

const LogoComponent: React.FC<{ fontSize?: number }> = (props) => {
  return (
    <LogoContainer>
      <LogoTextStyled
        style={props.fontSize ? { fontSize: props.fontSize } : null}
      >
        TGL
      </LogoTextStyled>
      <LogoLine />
    </LogoContainer>
  );
};

export default LogoComponent;
