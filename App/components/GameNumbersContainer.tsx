import React, { useCallback } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import Game from "../models/Game";
import {
  selectNumber,
  getSelectedNumbers,
  removeNumber,
} from "../store/gamesSlice";
import GameNumberButton from "./GameNumberButton";

const GameNumbersContainer: React.FC<{
  game: Game;
}> = (props) => {
  const selectedNumbers = useAppSelector(getSelectedNumbers);
  const dispatch = useAppDispatch();

  const gameButtonHandler = useCallback(
    (clickedNumber: number) => {
      if (selectedNumbers.some((number) => number === clickedNumber)) {
        dispatch(removeNumber(clickedNumber));
      } else if (selectedNumbers.length === props.game.maxNumber) {
        Alert.alert(
          "Quantidade máxima de seleção foi atingida",
          "Desmarque um número para poder selecionar outro. Ou use o botão 'Clear' e selecione novos números."
        );
      } else {
        dispatch(selectNumber(clickedNumber));
      }
    },
    [dispatch, selectedNumbers, props.game]
  );

  return (
    <FlatList
      style={{
        marginTop: 16,
        alignContent: "space-between",
        minWidth: "100%",
        maxHeight: "62%",
        marginBottom: 15,
      }}
      numColumns={5}
      contentContainerStyle={styles.numbersContainer}
      data={[...new Array(props.game.range)].map((_, index) => ++index)}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <GameNumberButton
          key={item}
          number={`0${item}`.slice(-2)}
          gameColor={props.game.color}
          hasSelected={selectedNumbers.indexOf(item) >= 0}
          onPress={gameButtonHandler.bind(this, item)}
        />
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  numbersContainer: {
    width: "100%",
    alignItems: "stretch",
    paddingBottom: 48,
  },
});
export default GameNumbersContainer;
