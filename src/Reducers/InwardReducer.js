import {createReducer} from "@reduxjs/toolkit"

export const inwardReducer=createReducer({},{
    getAllInwardRequest: (state) => {
        state.loading = true;
      },
      getAllInwardSuccess: (state, action) => {
        state.loading = false;
        state.inward = action.payload;
      },
      getAllInwardFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      changeStatusRequest: (state) => {
        state.loading = true;
      },
      changeStatusSuccess: (state) => {
        state.loading = false;
      },
      changeStatusFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      getAllInwardArchiveRequest: (state) => {
        state.loading = true;
      },
      getAllInwardArchiveSuccess: (state, action) => {
        state.loading = false;
        state.archivedOrders = action.payload;
      },
      getAllInwardArchiveFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
})