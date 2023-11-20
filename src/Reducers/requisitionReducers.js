import { createReducer } from "@reduxjs/toolkit";

const intialState = {};

export const createOrder = createReducer(intialState, {
  createOrdersRequest: (state) => {
    state.loading = true;
  },
  createOrdersSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  },
  createOrdersFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
