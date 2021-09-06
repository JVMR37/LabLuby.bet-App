import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import SavedGame from "../models/SavedGame";
import { addItem } from "../store/cartSlice";
import { removeNumber } from "../store/gamesSlice";

const SelectedNumbers: React.FC<{ numbers: number[]; gameColor: string }> =
  () => {
    const dispatch = useAppDispatch();

    return (
      <ScrollView
        contentContainerStyle={styles.selectedNumbersRow}
      ></ScrollView>
    );
  };

const styles = StyleSheet.create({
  selectedNumbersRow: {
    flexDirection: "row",
    wrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SelectedNumbers;
