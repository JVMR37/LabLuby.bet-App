import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useAppSelector } from "../hooks/hooks";
import SavedGame from "../models/SavedGame";
import { getSavedGames } from "../store/gamesSlice";
import { appColors } from "../styles/appTheme";
import GameItem from "./GameItem";
import GamePagination from "./GamePagination";

const RecentGamesComponent: React.FC = () => {
  const savedGames = useAppSelector(getSavedGames) as Array<SavedGame>;
  const savedGamesElements = useCallback(() => {
    console.log(savedGames.length);

    if (savedGames.length === 0) {
      return (
        <View style={styles.noGamesView}>
          <Text style={styles.noGameText}>
            There are no games to display : (
          </Text>
          <Text
            style={{
              ...styles.noGameText,
              fontWeight: "bold",
            }}
          >
            Change the filter or add a new bet
          </Text>
        </View>
      );
    }

    return savedGames.map((game) => (
      <GameItem
        key={game.id}
        gameColor={game.betType.color}
        gameDate={game.getCreatedAt()}
        gameName={game.betType.type}
        gamePrice={game.price}
        selectedNumbers={game.numbers.join(", ") + "."}
      />
    ));
  }, [savedGames])();

  return (
    <View style={{ minHeight: "100%", flexGrow: 1 }}>
      <GamePagination>{savedGamesElements}</GamePagination>
    </View>
  );
};

const styles = StyleSheet.create({
  noGamesView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "60%",
  },
  noGameText: {
    textAlign: "center",
    width: "100%",
    color: appColors.secondary,
  },
  gameView: {
    maxWidth: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 16,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderLeftWidth: 4,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  datePriceText: {
    textAlign: "center",
    paddingVertical: 8,
    color: appColors.secondary,
  },
  nameGameText: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  numbersText: {
    flexWrap: "wrap",
    fontWeight: "bold",
    color: appColors.secondary,
  },
  gamePriceRow: {
    flexWrap: "wrap",
    width: "100%",
    color: appColors.secondary,
  },
});

export default RecentGamesComponent;
