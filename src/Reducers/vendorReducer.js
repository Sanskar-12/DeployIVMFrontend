import {createReducer} from "@reduxjs/toolkit";

const intialState={
    vendorData:[],
    getVendorData:[]
};
 export const createVendor=createReducer(intialState,{
    createVendorsRequest: (state) => {
        state.loading = true;
      },
      createVendorsSuccess: (state, action) => {
        state.loading = false;
        state.workOrderdata = action.payload;
      },
      createVendorsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    
      getVendorDataRequest: (state) => {
        state.loading = true;
      },
      getVendorDataSuccess: (state, action) => {
        state.loading = false;
        state.getworkOrderdata = action.payload;
      },
      getVendorDataFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      getVendorDataByIdRequest: (state) => {
        state.loading = true;
      },
      getVendorDataByIdSuccess: (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
      },
      getVendorDataByIdFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
 });