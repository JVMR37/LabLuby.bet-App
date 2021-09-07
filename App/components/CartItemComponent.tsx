import { useAppDispatch } from "../hooks/hooks";
import { removeItem } from "../store/cartSlice";
import React, { useCallback } from "react";
import { IconButton, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { appColors } from "../styles/appTheme";

export interface CartItemProps {
  cartItemId: number;
  gameColor: string;
  gameDate: string;
  selectedNumbers: string;
  gameName: string;
  gamePrice: number;
}

const CartItemComponent: React.FC<CartItemProps> = (props) => {
  const dispatch = useAppDispatch();

  const removeButtonHandler = useCallback(
    (event: any) => {
      event.preventDefault();
      dispatch(removeItem(props.cartItemId));
    },
    [dispatch, props.cartItemId]
  );

  return (
    <View style={styles.cartItemContainer}>
      <View
        style={{ ...styles.gameLine, backgroundColor: props.gameColor }}
      ></View>
      <View style={styles.contentColumn}>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {props.selectedNumbers}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "97%",
          }}
        >
          <Text>
            {`${props.gameDate} - (R\$ ${props.gamePrice.toFixed(2)})`}
          </Text>
          <IconButton
            icon="trash-can-outline"
            color={appColors.secondary}
            onPress={removeButtonHandler}
          ></IconButton>
        </View>
        <Text
          style={{
            fontStyle: "italic",
            fontWeight: "bold",
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
    width: "80%",
    marginVertical: 16,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  gameLine: {
    height: "100%",
    borderRadius: 15,
    width: 8,
    marginRight: 8,
  },
  contentColumn: {
      justifyContent: 'space-evenly',
  },
});

export default CartItemComponent;
