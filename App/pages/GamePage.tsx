import React, { useCallback, useMemo, Fragment, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global.style";
import { Text } from "react-native-paper";
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
import GameNumbersContainer from "../components/GameNumbersContainer";

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

  const descriptionOrGameActions = useMemo(() => {
    return selectedNumbers.length > 0 ? (
      <Fragment>
        <SelectedNumbers
          numbers={selectedNumbers}
          gameColor={selectedGame!.color}
        />
        <GameActions />
      </Fragment>
    ) : (
      <Fragment>
        <Text
          style={{
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Fill your bet
        </Text>

        <Text
          key={selectedGame!.type}
          style={{
            fontStyle: "italic",
          }}
        >
          {selectedGame!.description}
        </Text>
      </Fragment>
    );
  }, [selectedNumbers, selectedGame]);

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
  }, [games, selectedGame])();

  return (
    <>
      <PageContainer needsScroll={false}>
        <Text style={globalStyles.titlePage}>
          New Bet for {selectedGame!.type}
        </Text>
        <Text
          style={{
            fontStyle: "italic",
            marginTop: 8,
          }}
        >
          Choose a game
        </Text>
        <ScrollView
          style={{ minWidth: "100%", minHeight: 70 }}
          contentContainerStyle={styles.gameButtonsRow}
          horizontal
        >
          {gameButtonsElements}
        </ScrollView>
        {descriptionOrGameActions}

        <GameNumbersContainer game={selectedGame!} />
      </PageContainer>
    </>
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
