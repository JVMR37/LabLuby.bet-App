import React from "react";
import { Image, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const game_button = require("../assets/game_button.png");
import { appColors } from "../styles/appTheme";
import NavButton from "../components/NavButton";
import { View, StyleSheet } from "react-native";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";

interface Props {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: any;
}

const NavigationBar: React.FC<Props> = ({ state, descriptors, navigation }) => {
  const windowWidth = Dimensions.get("window").width;

  const onPress = (index: number, name: string) => {
    console.log(name);
    console.log(state.routes);

    const isFocused = state.index === index;

    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  };

  return (
    <View style={styles.navigationBar}>
      <NavButton
        key={"Home Button"}
        title="Home"
        isSelected={state.index === 0}
        icon={
          <MaterialCommunityIcons
            name="home-outline"
            size={34}
            color={state.index === 0 ? appColors.primary : appColors.secondary}
          />
        }
        onPress={onPress.bind(this, 0, "Home")}
      />

      <View
        style={{
          width: windowWidth,
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <TouchableOpacity onPress={onPress.bind(this, 1, "Game")}>
          <View
            style={{
              elevation: 100,
            }}
          >
            <Image
              source={game_button}
              style={{
                marginBottom: 16,
                width: 80,
                height: 80,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <NavButton
        key={"Account Button"}
        title="Account"
        isSelected={state.index === 2}
        icon={
          <MaterialCommunityIcons
            name="account-outline"
            size={34}
            color={state.index === 2 ? appColors.primary : appColors.secondary}
          />
        }
        onPress={onPress.bind(this, 2, "Account")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navButton: {
    height: "100%",
    borderTopWidth: 3,
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  navigationBar: {
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 70,
  },
});

export default NavigationBar;
