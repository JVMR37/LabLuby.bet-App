import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { appColors } from "../styles/appTheme";

const GameNumberButton: React.FC<{
  number: string,
  gameColor: string;
  hasSelected: boolean;
  onPress: () => void;
}> = (props) => {
  return (
    <Button
      key={props.number}
      mode="contained"
      style={{
        ...styles.numberButton,
        backgroundColor: props.hasSelected
          ? props.gameColor
          : appColors.gameNumbers,
        alignItems: "center",
        justifyContent: "center",
      }}
      contentStyle={{
        padding: 0,
        margin: 0,
      }}
      labelStyle={{
        fontWeight: "bold",
        fontSize: 24,
        margin: 0,
        padding: 0,
        color: "white",
      }}
      onPress={props.onPress.bind(this, props.number)}
    >
      <Text style={{ padding: 0, margin: 0 }}>{props.number}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  numberButton: {
    flexShrink: 0,
    flexGrow: 0,
    // flexBasis: "20%",
    borderRadius: 50,
    height: 60,
    width: 60,
    padding: 0,
    marginHorizontal: 4,
    marginVertical: 6,
  },
});

export default GameNumberButton;
