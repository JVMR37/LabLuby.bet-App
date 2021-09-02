import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Dimensions } from "react-native";

import AppScaffold from "../layout/AppScaffold";
import { globalStyles } from "../styles/global.style";
import GameOutlineButton from "../components/GameOutlineButton";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import {
  loadSavedBets,
  selectAvailableGames,
  selectFilter,
  getGameFilter,
} from "../store/gamesSlice";
import Game from "../models/Game";
import RecentGamesComponent from "../components/RecentGamesComponent";

const HomePage: React.FC = () => {
  const windowWidth = Dimensions.get("window").width;

  const dispatch = useAppDispatch();
  const games = useAppSelector(selectAvailableGames) as Array<Game>;
  const filter = useAppSelector(getGameFilter);
  const filterButtonHandler = useCallback(
    async (typeId: any) => {
      console.log(typeId);

      if (filter === typeId) {
        dispatch(selectFilter(""));
        dispatch(loadSavedBets({ page: 1 }));
      } else {
        dispatch(loadSavedBets({ page: 1, filter: typeId.toString() }));

        dispatch(selectFilter(typeId));
      }
    },
    [dispatch, filter]
  );

  const filterButtonsElements = useCallback(
    () =>
      games.map((game: Game) => (
        <GameOutlineButton
          key={game.id}
          title={game.type}
          isSelected={game.id.toString() == filter}
          gameColor={game.color}
          onPress={filterButtonHandler.bind(null, game.id)}
        ></GameOutlineButton>
      )),
    [filter, filterButtonHandler, games]
  )();

  return (
    <AppScaffold>
      <Text style={{ ...globalStyles.titlePage }}>Recent Games</Text>
      <Text>Filters</Text>
      <ScrollView
        style={{ minWidth: '100%' }}
        contentContainerStyle={styles.filterButtonsRow}
        horizontal
      >
        {filterButtonsElements}
      </ScrollView>
      <View style={{ height: "75%" }}>
        <RecentGamesComponent />
      </View>
    </AppScaffold>
  );
};

const styles = StyleSheet.create({
  filterButtonsRow: {
    minWidth: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "scroll",
  },
});

export default HomePage;
