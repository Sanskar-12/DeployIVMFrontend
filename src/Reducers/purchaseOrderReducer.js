import { createReducer } from "@reduxjs/toolkit";

const intialState = {
  purchaseOrderdata: [],
  getpurchaseOrderdata:[]
};

export const createPuchaseOrder = createReducer(intialState, {
  createPurchaseOrdersRequest: (state) => {
    state.loading = true;
  },
  createPurchaseOrdersSuccess: (state, action) => {
    state.loading = false;
    state.purchaseOrderdata = action.payload;
  },
  createPurchaseOrdersFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getPurchaseOrdersDataRequest: (state) => {
    state.loading = true;
  },
  getPurchaseOrdersDataSuccess: (state, action) => {
    state.loading = false;
    state.getpurchaseOrderdata = action.payload;
  },
  getPurchaseOrdersDataFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
