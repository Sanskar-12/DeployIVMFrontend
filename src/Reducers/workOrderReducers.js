import { createReducer } from "@reduxjs/toolkit";

const intialState = {
  workOrderdata: [],
  getworkOrderdata:[]
};

export const createWorkOrder = createReducer(intialState, {
  createWorkOrdersRequest: (state) => {
    state.loading = true;
  },
  createWorkOrdersSuccess: (state, action) => {
    state.loading = false;
    state.workOrderdata = action.payload;
  },
  createWorkOrdersFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getWorkOrdersDataRequest: (state) => {
    state.loading = true;
  },
  getWorkOrdersDataSuccess: (state, action) => {
    state.loading = false;
    state.getworkOrderdata = action.payload;
  },
  getWorkOrdersDataFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getAllWorkOrdersDataRequest: (state) => {
    state.loading = true;
  },
  getAllWorkOrdersDataSuccess: (state, action) => {
    state.loading = false;
    state.getworkOrderdata = action.payload;
  },
  getAllWorkOrdersDataFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  
  deleteWorkOrdersDataRequest: (state) => {
    state.loading = true;
  },
  deleteWorkOrdersDataSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteWorkOrdersDataFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
