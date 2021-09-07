import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
} from "react-native";
import {} from "expo-status-bar";
import { Button, IconButton } from "react-native-paper";
import { appColors } from "../styles/appTheme";
import {
  clearCart,
  selectCartItens,
  selectCartTotalPrice,
  selectMinCartValue,
  showCartToggle,
} from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CartItemComponent from "../components/CartItemComponent";
import { loadSavedBets, saveBets } from "../store/gamesSlice";

const CartComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const closeButtonHandler = () => {
    dispatch(showCartToggle());
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
      return <Text>There are no games added to the cart : (</Text>;
    }
  }, [cartItens])();

  const saveButtonHandler = useCallback(async () => {
    const result = await dispatch(saveBets(cartItens));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(clearCart());
      dispatch(loadSavedBets({ page: 1 }));

      //TODO: Faça alçgo aqui
    } else {
      //TODO: Faça algo aqui
    }
  }, [cartItens, dispatch]);

  return (
    <Animated.View style={styles.cartOverlay}>
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
    alignItems: "flex-end",
  },
  cartContainer: {
    height: "100%",
    width: "70%",
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    borderRadius: 13,
  },
});

export default CartComponent;
