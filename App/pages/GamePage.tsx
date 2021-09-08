import React, { useCallback, useMemo, Fragment, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
import { Swipeable } from "react-native-gesture-handler";
import { selectCartItens, setShowCartValue } from "../store/cartSlice";

const GamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectAvailableGames) as Array<Game>;
  const selectedGame = useAppSelector(getSelectedGame);
  const selectedNumbers = useAppSelector(getSelectedNumbers);
  const swipeRef = useRef<Swipeable>(null);
  const cartItens = useAppSelector(selectCartItens);

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
    <Swipeable
      ref={swipeRef}
      enabled={cartItens.length > 0}
      renderRightActions={() => (
        <View
          style={{
            width: 1,
          }}
        ></View>
      )}
      onSwipeableRightWillOpen={() => dispatch(setShowCartValue(true))}
    >
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
    </Swipeable>
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
