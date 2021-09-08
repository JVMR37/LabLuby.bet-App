import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { appColors } from "../styles/appTheme";
import {
  clearCart,
  selectCartItens,
  selectCartTotalPrice,
  selectMinCartValue,
  setShowCartValue,
} from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CartItemComponent from "../components/CartItemComponent";
import { loadSavedBets, saveBets } from "../store/gamesSlice";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Swipeable } from "react-native-gesture-handler";

const CartComponent: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<any, any>>();

  const dispatch = useAppDispatch();
  const swipeRef = useRef<Swipeable>(null);

  const closeButtonHandler = () => {
    dispatch(setShowCartValue(false));
  };

  const cartItens = useAppSelector(selectCartItens);
  const cartTotalPrice = useAppSelector(selectCartTotalPrice);
  const minCartTotalPrice = useAppSelector(selectMinCartValue);

  const showWarning = useMemo(
    () => minCartTotalPrice !== 0 && cartTotalPrice < minCartTotalPrice,
    [cartTotalPrice, minCartTotalPrice]
  );

  const cartContent = useCallback(() => {
    if (cartItens.length > 0) {
      return cartItens.map((cartItem) => {
        return (
          <CartItemComponent
            key={cartItem.id}
            cartItemId={cartItem.id}
            gameColor={cartItem.betType.color}
            gameName={cartItem.betType.type}
            gamePrice={cartItem.betType.price}
            selectedNumbers={cartItem.numbers.join(", ") + "."}
            gameDate={cartItem.getCreatedAt()}
          ></CartItemComponent>
        );
      });
    } else {
      return <Text
      style={{
        marginHorizontal: 16,
        marginVertical: 32,
        fontSize: 16,
        textAlign: "center"
      }}
      >There are no games added to the cart : (</Text>;
    }
  }, [cartItens])();

  const saveButtonHandler = useCallback(async () => {
    const result = await dispatch(saveBets(cartItens));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(clearCart());
      dispatch(setShowCartValue(false));
      dispatch(loadSavedBets({ page: 1 }));
      navigation.navigate("Home");

      Alert.alert(
        "Successfully saved games!",
        "Check out your new games on the home page"
      );
    } else {
      Alert.alert("Something went wrong : (");
    }
  }, [cartItens, dispatch]);

  return (
    <Animated.View style={styles.cartOverlay}>
      <Swipeable
        ref={swipeRef}
        renderLeftActions={() => (
          <View
            style={{
              width: 5,
            }}
          ></View>
        )}
        onSwipeableLeftWillOpen={() => dispatch(setShowCartValue(false))}
      >
        <View style={styles.cartContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              icon="close"
              color={appColors.primary}
              onPress={closeButtonHandler}
            ></IconButton>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 16,
            }}
          >
            <MaterialCommunityIcons
              name="cart-outline"
              size={32}
              color={appColors.primary}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 32,
                color: appColors.secondary,
                fontStyle: "italic",
              }}
            >
              CART
            </Text>
          </View>
          <ScrollView>{cartContent}</ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 16,
              marginVertical: 16,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 16,
              }}
            >
              {"CART "}
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: 16,
                }}
              >
                {"TOTAL"}
              </Text>
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              R$ {cartTotalPrice.toFixed(2)}
              {showWarning && (
                <Text
                  style={{
                    color: appColors.error,
                  }}
                >
                  *
                </Text>
              )}
            </Text>
          </View>
          {showWarning && (
            <Text
              style={{
                textAlign: "center",
                marginVertical: 8,
                marginHorizontal: 16,
                color: appColors.error,
                flexWrap: "wrap",
              }}
            >
              *Cart must be at least R${minCartTotalPrice.toFixed(2)} to save
            </Text>
          )}

          <Button
            mode="contained"
            icon="arrow-right"
            disabled={showWarning}
            uppercase={false}
            style={{
              borderRadius: 0,
              backgroundColor: "#f4f4f4",
            }}
            onPress={saveButtonHandler}
            contentStyle={{
              paddingVertical: 32,
              borderRadius: 0,
              flexDirection: "row-reverse",
            }}
            labelStyle={{
              fontSize: 32,
              fontStyle: "italic",
              color: appColors.primary,
            }}
          >
            <Text>Save</Text>
          </Button>
        </View>
      </Swipeable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cartOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffffcc",
    minWidth: "100%",
    minHeight: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cartContainer: {
    alignSelf: "flex-end",
    height: "100%",
    minWidth: "85%",
    width: "85%",
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    borderRadius: 13,
  },
});

export default CartComponent;
