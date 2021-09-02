import React from "react";
import { Button } from "react-native-paper";
import { appColors } from "../styles/appTheme";

interface Props {
  title: string;
  onPress: (game?: string) => void;
  gameColor: string;
  isSelected: boolean;
}

const GameOutlineButton: React.FC<Props> = (props) => (
  <Button
    mode="outlined"
    labelStyle={{
      fontWeight: "bold",
      color: props.isSelected ? appColors.background : props.gameColor,
    }}
    style={{
      borderColor: props.gameColor,
      borderRadius: 32,
      minWidth: "30%",
      borderWidth: 2,
      backgroundColor: props.isSelected
        ? props.gameColor
        : appColors.background,
    }}
    uppercase={false}
    onPress={props.onPress}
  >
    {props.title}
  </Button>
);

export default GameOutlineButton;
