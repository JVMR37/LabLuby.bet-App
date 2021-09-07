import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import SavedGame from "../models/SavedGame";
import { addItem } from "../store/cartSlice";
import {
  clearSelectedNumbers,
  getSelectedGame,
  getSelectedNumbers,
  randomlySelectNumbers,
} from "../store/gamesSlice";

import { Button } from "react-native-paper";
import { appColors } from "../styles/appTheme";

const GameActions: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedGame = useAppSelector(getSelectedGame);
  const selectedNumbers = useAppSelector(getSelectedNumbers);

  const completeGameButtonHandler = useCallback(() => {
    console.log("========== Complete Button Clicked ==========");
    const hasNumberAvailable = selectedGame!.maxNumber - selectedNumbers.length;

    if (!hasNumberAvailable) {
      dispatch(clearSelectedNumbers());
    }

    dispatch(randomlySelectNumbers());
  }, [dispatch, selectedGame, selectedNumbers.length]);

  const clearGameButtonHandler = useCallback(() => {
    console.log("========== Clear Button Clicked ==========");
    dispatch(clearSelectedNumbers());
  }, []);

  const addToCartButtonHandler = useCallback(() => {
    console.log("========== Add To Cart Button Clicked ==========");
    const availableNumbersCount =
      selectedGame!.maxNumber - selectedNumbers.length;

    console.log(availableNumbersCount);

    if (availableNumbersCount > 0) {
      return;
    }

    dispatch(
      addItem(
        new SavedGame(selectedNumbers, selectedGame!, selectedGame!.price)
      )
    );
    dispatch(clearSelectedNumbers());
  }, [dispatch, selectedGame, selectedNumbers]);

  return (
    <View style={styles.gameActionsRow}>
      <Button
        mode="outlined"
        contentStyle={{
          padding: 0,
          borderColor: appColors.primary,
          margin: 0,
        }}
        labelStyle={{
          padding: 0,
          color: appColors.primary,
          margin: 0,
        }}
        style={{
          borderWidth: 2,
          borderRadius: 45,
          borderColor: appColors.primary,
          backgroundColor: appColors.background,
          padding: 0,
          margin: 0,
        }}
        uppercase={false}
        onPress={completeGameButtonHandler}
      >
        <Text>Complete</Text>
      </Button>
      <Button
        mode="outlined"
        uppercase={false}
        style={{
          backgroundColor: appColors.background,
          borderWidth: 2,
          borderRadius: 45,
          borderColor: appColors.primary,
          padding: 0,
          margin: 0,
        }}
        labelStyle={{
          color: appColors.primary,
        }}
        onPress={clearGameButtonHandler}
      >
        <Text>Clear</Text>
      </Button>

      <Button
        mode="contained"
        uppercase={false}
        icon="cart-outline"
        contentStyle={{
          padding: 0,
          margin: 0,
        }}
        labelStyle={{
          padding: 0,
          margin: 0,
          color: appColors.background,
        }}
        style={{
          borderWidth: 2,
          borderRadius: 45,
          borderColor: appColors.primary,
          padding: 0,
          margin: 0,
        }}
        onPress={addToCartButtonHandler}
      >
        <Text>Add to cart</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  gameActionsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
});

export default GameActions;
