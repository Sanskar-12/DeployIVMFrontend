import { createReducer } from "@reduxjs/toolkit";

const intialState = {};

export const userReducer = createReducer(intialState, {
  loginRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
    state.message = action.payload;
    sessionStorage.setItem("userId", JSON.stringify(state.user));
  },
  loginFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = action.payload;
  },
  loadUserRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  loadUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.error = action.payload;
  },
  logoutRequest: (state) => {
    state.loading = true;
  },
  logoutSuccess: (state) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    sessionStorage.removeItem("userId");
  },
  logoutFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
