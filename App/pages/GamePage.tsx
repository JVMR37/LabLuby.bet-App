import React, { useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global.style";

import AppScaffold from "../layout/AppScaffold";
import PageContainer from "../layout/PageContainer";
import GameOutlineButton from "../components/GameOutlineButton";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  clearSelectedNumbers,
  getSelectedGame,
  getSelectedNumbers,
  selectAvailableGames,
  selectGame,
} from "../store/gamesSlice";
import Game from "../models/Game";
import SelectedNumbers from "../components/SelectedNumbers";
import GameActions from "../components/GameActions";

const GamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectAvailableGames) as Array<Game>;
  const selectedGame = useAppSelector(getSelectedGame);
  const selectedNumbers = useAppSelector(getSelectedNumbers);

  const gameButtonHandler = useCallback(
    (gameName: string) => {
      console.log("========== Game Button Clicked ==========");
      dispatch(clearSelectedNumbers());
      dispatch(selectGame(gameName));
    },
    [dispatch]
  );

  const gameButtonsElements = useCallback(() => {
    return games.map((game: Game) => (
      <GameOutlineButton
        key={game.id}
        title={game.type}
        isSelected={game === selectedGame}
        gameColor={game.color}
        onPress={gameButtonHandler.bind(this, game.type)}
      />
    ));
  }, [games])();

  return (
    <PageContainer>
      <Text style={globalStyles.titlePage}>New Bet for {""}</Text>
      <Text>Choose a game</Text>
      <ScrollView
        style={{ minWidth: "100%", minHeight: 70 }}
        contentContainerStyle={styles.gameButtonsRow}
        horizontal
      >
        {gameButtonsElements}
      </ScrollView>

      <Text>Fill your bet</Text>

      <Text>{"TODO: Description here"}</Text>

      {selectedNumbers.length > 0 && (
        <SelectedNumbers
          numbers={selectedNumbers}
          gameColor={selectedGame!.color}
        />
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  gameButtonsRow: {
    minWidth: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "scroll",
  },
});

export default GamePage;
