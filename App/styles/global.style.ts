import { StyleSheet } from "react-native";
import { appColors } from "./appTheme";

export const globalStyles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    width: "100%",
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 16,
  },

  titlePage: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: appColors.secondary,
    fontSize: 32,
  },
});
