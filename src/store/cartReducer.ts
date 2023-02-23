import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DishType {
  [key: string]: any;
}

interface CartState {
  cartItems: DishType[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<DishType>) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.cartItems.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<DishType>) => {
      let index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(index);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },
    changeQty: (state, action: PayloadAction<[DishType, number]>) => {
      let dish = state.cartItems.find(
        (item) => item.id === action.payload[0].id
      );
      if (dish) {
        dish.qty = action.payload[1];
      }
    },
  },
});

export const { addItem, removeItem, changeQty } = cartSlice.actions;

export default cartSlice.reducer;
