import React from "react";
import { View, StyleSheet } from "react-native";

const Card: React.FC<{
  width?: number | string;
  height?: number | string;
}> = (props) => (
  <View
    style={{
      ...styles.card,
      width: props.width ?? "90%",
      height: props.height,
    }}
  >
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    elevation: 5,
    borderRadius: 15,
    padding: 0,
    backgroundColor: "white",
  },
});

export default Card;
