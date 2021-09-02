import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useAppSelector } from "../hooks/hooks";
import SavedGame from "../models/SavedGame";
import { getSavedGames } from "../store/gamesSlice";
import { appColors } from "../styles/appTheme";

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
              textTransform: "uppercase",
            }}
          >
            Change the filter or add a new bet
          </Text>
        </View>
      );
    }

    return savedGames.map((game) => (
      <View
        key={game.id}
        style={{ ...styles.gameView, borderColor: game.betType.color }}
      >
        <Text style={styles.numbersText}>{game.numbers.join(", ") + "."}</Text>
        <View style={styles.gamePriceRow}>
          <Text style={styles.datePriceText}>
            {game.getCreatedAt()} - R${game.price.toFixed(2)}
          </Text>
        </View>
        <Text style={{ ...styles.nameGameText, color: game.betType.color }}>
          {game.betType.type}
        </Text>
      </View>
    ));
  }, [savedGames])();

  return (
    <ScrollView
      style={{ minHeight: "100%" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {savedGamesElements}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noGamesView: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  noGameText: {
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
