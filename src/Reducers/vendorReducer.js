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
        state.vendors = action.payload;
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

      
      deleteVendorByIdRequest: (state) => {
        state.loading = true;
      },
      deleteVendorByIdSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      deleteVendorByIdFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
 });