import { DefaultTheme } from "react-native-paper";

export const appColors = {
  primary: "#B5C401",
  secondary: "#707070",
  background: "#F7F7F7",
  label: "#9D9D9D",
  gameNumbers: "#adc0c4",
  error: "#bf2424",
  card: "#FFFFFF",
  accent: "#ddf000",
};

export const appTheme = {
  ...DefaultTheme,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    primary: appColors.primary,
    background: appColors.background,
    text: appColors.secondary,
    error: appColors.error,
    accent: appColors.accent,
  },
};
