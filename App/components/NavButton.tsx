import React from "react";

import { TouchableNativeFeedback, View, StyleSheet, Text } from "react-native";
import { appColors } from "../styles/appTheme";

interface Props {
  icon: any;
  isSelected?: boolean;
  title: string;
  onPress: () => void;
}

const NavButton: React.FC<Props> = (props) => {
  return (
    <TouchableNativeFeedback

      onPress={props.onPress}
      background={TouchableNativeFeedback.Ripple(appColors.primary, true)}
    >
      <View
        style={{
          ...styles.navButton,
          borderTopWidth: props.isSelected ? 3 : 0,
          borderColor: props.isSelected
            ? appColors.primary
            : appColors.secondary,
        }}
      >
        {props.icon}
        <Text
          style={{
            color: props.isSelected ? appColors.primary : appColors.secondary,
            fontWeight: props.isSelected ? "bold" : "normal",
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  navButton: {
    height: "100%",
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NavButton;
