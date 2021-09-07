import React, { useCallback, useMemo } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch } from "../hooks/hooks";
import { removeNumber } from "../store/gamesSlice";

const SelectedNumbers: React.FC<{ numbers: number[]; gameColor: string }> = (
  props
) => {
  const dispatch = useAppDispatch();

  const removeNumberButtonHandler = useCallback((number: number) => {
    dispatch(removeNumber(number));
  }, []);

  const selectedNumbersElement = useMemo(
    () =>
      props.numbers.map((selectedNumber) => (
        <Button
          key={selectedNumber}
          mode="contained"
          style={{
            ...styles.numberButton,
            backgroundColor: props.gameColor,
            alignItems: "center",
            justifyContent: "center",
          }}
          contentStyle={{
            padding: 0,
            margin: 0,
          }}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 16,
            margin: 0,
            padding: 0,
            color: "white",
          }}
          onPress={removeNumberButtonHandler.bind(this, selectedNumber)}
        >
          <Text>{`0${selectedNumber}`.slice(-2)}</Text>
        </Button>
      )),
    [props.numbers]
  );

  return (
    <ScrollView
      horizontal={true}
      style={{
        minWidth: "100%",
      }}
      contentContainerStyle={styles.selectedNumbersRow}
    >
      {selectedNumbersElement}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectedNumbersRow: {
    marginBottom: 8,
    flexDirection: "row",
    overflow: "scroll",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  numberButton: {
    borderRadius: 50,
    minHeight: 50,
    minWidth: 50,
    padding: 0,
    marginHorizontal: 6,
    marginVertical: 6,
  },
});

export default SelectedNumbers;
