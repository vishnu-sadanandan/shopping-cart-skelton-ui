// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

export const defaultState = {
    items: [],
    totalAmount: 0,
  };

const userSlice = createSlice({
  name: "user-slice",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state, action) {
      state.isLoggedIn = !state.isLoggedIn
    },
  }
})

const productSlice = createSlice({
  name: "product-slice",
  initialState: defaultState,
  reducers: {
    loadProducts(state, action) {
      const items = action.payload;
      return {
        ...state,
        items: items
      };
    }
  }
});

const cartSlice = createSlice({
  name: "cart-slice",
  initialState: defaultState,
  reducers: {
    addItem(state, actions) {
      const item = actions.payload;
      const totalAmount = state.totalAmount + item.price * item.amount;
      const isItemPresent = state.items.length > 0 && state.items.find(
        (itemInItems) => itemInItems.id === item.id
      );
      // let newState = state;
      if (isItemPresent) {
        state = {
          ...state,
            items: state.items.map((itemInOldState) => {
            if (itemInOldState.id !== item.id) {
              return itemInOldState;
                }
            return {
              ...itemInOldState,
              amount: item.amount + itemInOldState.amount,
            };
          }),
        };
      } else {
        state = {
              ...state,
              items: [...state.items, item]
          };
        }

        return {
            ...state,
            totalAmount: totalAmount
        };
    },
    removeItem(state, actions) {

      const itemId = actions.payload;
      const isItemPresent = state.items.find(
        (itemInItems) => itemInItems.id === itemId
      );

      const totalAmount = state.totalAmount - isItemPresent.price;
      const itemAmount = isItemPresent.amount;
      let newItems = state.items.map((itemInOldState) => {
        if (itemInOldState.id !== itemId) {
          return itemInOldState;
        }
        return {
          ...itemInOldState,
          amount: itemInOldState.amount - 1,
        };
      });
      if (itemAmount === 1) {
        newItems = newItems.filter((item) => item.id !== itemId);
      }

      return {
        ...state,
        items: newItems,
        totalAmount: totalAmount,
      };

    }
  }
});


const cartReducer = (state = defaultState, actions) => {
    if (actions.type === "ADD_ITEM") {
      const item = actions.payload;
      const totalAmount = state.totalAmount + item.price * item.amount;
      const isItemPresent = state.items.length > 0 && state.items.find(
        (itemInItems) => itemInItems.id === item.id
      );
      let newState = state;
      if (isItemPresent) {
        newState = {
          ...newState,
            items: state.items.map((itemInOldState) => {
            if (itemInOldState.id !== item.id) {
              return itemInOldState;
                }
            return {
              ...itemInOldState,
              amount: item.amount + itemInOldState.amount,
            };
          }),
        };
      } else {
          newState = {
              ...newState,
              items: [...state.items, item]
          };
        }

        return {
            ...newState,
            totalAmount: totalAmount
        };
    }
    if (actions.type === "REMOVE_ITEM") {
      const itemId = actions.payload;
      const isItemPresent = state.items.find(
        (itemInItems) => itemInItems.id === itemId
      );

      const totalAmount = state.totalAmount - isItemPresent.price;
      const itemAmount = isItemPresent.amount;
      let newItems = state.items.map((itemInOldState) => {
        if (itemInOldState.id !== itemId) {
          return itemInOldState;
        }
        return {
          ...itemInOldState,
          amount: itemInOldState.amount - 1,
        };
      });
      if (itemAmount === 1) {
        newItems = newItems.filter((item) => item.id !== itemId);
      }

      return {
        ...state,
        items: newItems,
        totalAmount: totalAmount,
      };
    }

    return defaultState;
  };
export const userSliceActions = userSlice.actions;
export const cartSliceActions = cartSlice.actions;
export const productSliceActions = productSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
export const userSliceReducer = userSlice.reducer;
export const productSliceReducer = productSlice.reducer;


export default cartReducer;
