import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export interface CartItemProps {
  gameColor: string;
  gameDate: string;
  selectedNumbers: string;
  gameName: string;
  gamePrice: number;
}

const GameItem: React.FC<CartItemProps> = (props) => {
  return (
    <View style={styles.cartItemContainer}>
      <View
        style={{ ...styles.gameLine, backgroundColor: props.gameColor }}
      ></View>
      <View style={styles.contentColumn}>
        <Text
          style={{
            fontWeight: "bold",
            fontStyle: "italic",
            paddingVertical: 4,
          }}
        >
          {props.selectedNumbers}
        </Text>

        <Text
          style={{
            paddingVertical: 4,
          }}
        >{`${props.gameDate} - (R\$ ${props.gamePrice.toFixed(2)})`}</Text>
        <Text
          style={{
            fontStyle: "italic",
            fontWeight: "bold",
            paddingVertical: 4,
            color: props.gameColor,
          }}
        >
          {props.gameName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    width: "100%",
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  gameLine: {
    height: "100%",
    borderRadius: 15,
    width: 7,
    marginRight: 16,
  },
  contentColumn: {
    justifyContent: "space-evenly",
  },
});

export default GameItem;
