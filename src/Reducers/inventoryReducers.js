import { createReducer } from "@reduxjs/toolkit";

const intialState = { };

export const getAllInventory = createReducer(intialState, {
  getAllInventoryRequest: (state) => {
    state.loading = true;
  },
  getAllInventorySuccess: (state, action) => {
    state.loading = false;
    state.products=action.payload
  },
  getAllInventoryFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deleteInventoryRequest: (state) => {
    state.loading = true;
  },
  deleteInventorySuccess: (state) => {
    state.loading = false;
    
  },
  deleteInventoryFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
