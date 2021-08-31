import { Text } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";
import { appColors } from "../styles/appTheme";

const TitlePageComponent: React.FC<{ title: string }> = (props) => {
  return (
    <Text key={props.title} style={styles.title}>
      {props.title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: appColors.secondary,
    fontSize: 32,
    marginVertical: 32,
  },
});

export default TitlePageComponent;
