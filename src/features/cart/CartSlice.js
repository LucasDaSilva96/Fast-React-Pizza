// Import createSlice from @reduxjs/toolkit for creating Redux slices
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart slice
const initialState = {
  cart: [],
};

// Create a cart slice using createSlice
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Add item to the cart
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    // Delete item from the cart
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (pizzas) => pizzas.pizzaId !== action.payload,
      );
    },
    // Increase quantity of a specific item in the cart
    increaseItemQuantity(state, action) {
      const item = state.cart.find((pizza) => pizza.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    // Decrease quantity of a specific item in the cart
    decreaseItemQuantityItem(state, action) {
      const item = state.cart.find((pizza) => pizza.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // If quantity becomes zero, remove the item from the cart
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    // Clear the entire cart
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

// Export actions from the cart slice
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantityItem,
  clearCart,
} = cartSlice.actions;

// Export the reducer function from the cart slice
export default cartSlice.reducer;

// Selectors for accessing specific parts of the cart state
export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((pizza) => pizza.pizzaId === id)?.quantity ?? 0;
