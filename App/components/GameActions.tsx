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
        uppercase={false}
        onPress={completeGameButtonHandler}
      >
        <Text>Complete Game</Text>
      </Button>
      <Button
        mode="outlined"
        uppercase={false}
        onPress={clearGameButtonHandler}
      >
        <Text>Clear Game</Text>
      </Button>

      <Button
        mode="contained"
        uppercase={false}
        icon="cart-outline"
        onPress={addToCartButtonHandler}
      >
        <Text>Add to cart</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  gameActionsRow: {
    flexDirection: "row",
    wrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default GameActions;
