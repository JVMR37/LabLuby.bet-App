import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import SavedGame from "../models/SavedGame";

export interface CartState {
  items: Array<SavedGame>;
  minCartValue: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  minCartValue: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<SavedGame>) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price;

      if (action.payload.betType.minCartValue > state.minCartValue!) {
        state.minCartValue = action.payload.betType.minCartValue;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const cartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (cartItemIndex !== -1) {
        state.totalPrice -= state.items[cartItemIndex].price;
        state.items.splice(cartItemIndex, 1);
      }

      if (state.items.length === 0) {
        state.minCartValue = 0;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.minCartValue = 0;
      state.totalPrice = 0;
    },

    setMinCartValue: (state, action: PayloadAction<number>) => {
      state.minCartValue = action.payload;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const selectCartItens = (state: RootState) => state.cart.items;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectMinCartValue = (state: RootState) => state.cart.minCartValue;

export default cartSlice.reducer;
