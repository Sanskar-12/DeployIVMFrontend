import { createReducer } from "@reduxjs/toolkit";

const intialState = { orders: [] };

export const getAllOrders = createReducer(intialState, {
  getAllOrdersRequest: (state) => {
    state.loading = true;
  },
  getAllOrdersSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
    // state.orderCount=action.payload.orderCount;
    // state.resultPerPage=action.payload.resultPerPage
  },
  getAllOrdersFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getAllOrdersForIntiatorSuperAdminandAdminRequest: (state) => {
    state.loading = true;
  },
  getAllOrdersForIntiatorSuperAdminandAdminSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  
  },
  getAllOrdersForIntiatorSuperAdminandAdminFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  
  getOrdersforApproverRequest: (state) => {
    state.loading = true;
  },
  getOrdersforApproverSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  
  },
  getOrdersforApproverFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  
  getOrdersforApproverafterApprovedRequest: (state) => {
    state.loading = true;
  },
  getOrdersforApproverafterApprovedSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  
  },
  getOrdersforApproverafterApprovedFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },


  approveOrdersRequest: (state) => {
    state.loading = true;
  },
  approveOrdersSuccess: (state,action) => {
    state.loading = false;
    state.remark=action.payload
    
  },
  approveOrdersFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  declineOrdersRequest: (state) => {
    state.loading = true;
  },
  declineOrdersSuccess: (state,action) => {
    state.loading = false;
    state.remark=action.payload
    
  },
  declineOrdersFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  
  approveOrdersforApproverRequest: (state) => {
    state.loading = true;
  },
  approveOrdersforApproverSuccess: (state,action) => {
    state.loading = false;
    state.approverremark=action.payload
    
  },
  approveOrdersforApproverFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  declineOrdersforApproverRequest: (state) => {
    state.loading = true;
  },
  declineOrdersforApproverSuccess: (state,action) => {
    state.loading = false;
    state.approverremark=action.payload
  },
  declineOrdersforApproverFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  
  getApprovedofVerifierRequest: (state) => {
    state.loading = true;
  },
  getApprovedofVerifierSuccess: (state, action) => {
    state.loading = false;
    state.approvedOrder = action.payload;
  
  },
  getApprovedofVerifierFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getRejectedofVerifierRequest: (state) => {
    state.loading = true;
  },
  getRejectedofVerifierSuccess: (state, action) => {
    state.loading = false;
    state.rejectedOrder = action.payload;
  
  },
  getRejectedofVerifierFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getAllOrderArchiveRequest: (state) => {
    state.loading = true;
  },
  getAllOrderArchiveSuccess: (state, action) => {
    state.loading = false;
    state.archivedOrders = action.payload;
  },
  getAllOrderArchiveFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  
  getAllOrderByIDRequest: (state) => {
    state.loading = true;
  },
  getAllOrderByIDSuccess: (state, action) => {
    state.loading = false;
    state.order = action.payload;
  },
  getAllOrderByIDFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
