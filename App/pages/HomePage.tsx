import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

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
import PageContainer from "../layout/PageContainer";
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectAvailableGames) as Array<Game>;
  const filters = useAppSelector(getGameFilter) as Array<string>;
  const filterButtonHandler = useCallback(
    async (typeId: string) => {
      const newFilters = Array.from(filters);
      const typeIndex = newFilters.findIndex((value) => value == typeId);
      console.log(typeIndex);

      if (typeIndex !== -1) {
        newFilters.splice(typeIndex, 1);
      } else {
        newFilters.push(typeId);
      }
      dispatch(selectFilter(newFilters));
      dispatch(loadSavedBets({ page: 1, filters: newFilters }));
    },
    [dispatch, filters]
  );

  const filterButtonsElements = useCallback(() => {
    console.log(filters);

    return games.map((game: Game) => (
      <GameOutlineButton
        key={game.id}
        title={game.type}
        isSelected={filters.some((value) => value == game.id.toString())}
        gameColor={game.color}
        onPress={filterButtonHandler.bind(null, game.id.toString())}
      ></GameOutlineButton>
    ));
  }, [filters, filterButtonHandler, games])();

  return (
    <PageContainer>
      <Text style={{ ...globalStyles.titlePage }}>Recent Games</Text>
      <Text>Filters</Text>
      <ScrollView
        style={{ minWidth: "100%", minHeight: 70 }}
        contentContainerStyle={styles.filterButtonsRow}
        horizontal
      >
        {filterButtonsElements}
      </ScrollView>
      <RecentGamesComponent />
    </PageContainer>
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
