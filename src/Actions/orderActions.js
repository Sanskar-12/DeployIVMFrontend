import axios from "axios";
import { server } from "../store";
// import { server } from "../store";

export const getAllOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const { data } = await axios.get(`${server}/order/get-order`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllOrdersSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const approveOrdersAction = (orderId,remark) => async (dispatch) => {
  try {
    dispatch({
      type: "approveOrdersRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const {data}=await axios.post(`${server}/order/accept/${orderId}`,{remark:remark},{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "approveOrdersSuccess",
      payload:data.remark
    });
  } catch (error) {
    dispatch({
      type: "approveOrdersFail",
      payload: error.response.data.message,
    });
  }
};



export const declineOrdersAction = (orderId,remark) => async (dispatch) => {
  try {
    dispatch({
      type: "declineOrdersRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const {data}=await axios.post(`${server}/order/reject/${orderId}`,{remark:remark},{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "declineOrdersSuccess",
      payload:data.remark
    });
  } catch (error) {
    dispatch({
      type: "declineOrdersFail",
      payload: error.response.data.message,
    });
  }
};



export const getAllOrdersForIntiatorSuperAdminandAdminAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersForIntiatorSuperAdminandAdminRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const { data } = await axios.get(`${server}/order/get-order-intiator-superadmin-admin`,{
      withCredentials: true,
    });

    dispatch({
      type: "getAllOrdersForIntiatorSuperAdminandAdminSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersForIntiatorSuperAdminandAdminFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrdersForApprover = () => async (dispatch) => {
  try {
    dispatch({
      type: "getOrdersforApproverRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const { data } = await axios.get(`${server}/order/remarkedorders`,{
      withCredentials: true,
    });

    dispatch({
      type: "getOrdersforApproverSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getOrdersforApproverFail",
      payload: error.response.data.message,
    });
  }
};


export const approveOrdersforApproverAction = (orderId,approverremark) => async (dispatch) => {
  try {
    dispatch({
      type: "approveOrdersforApproverRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const {data}=await axios.post(`${server}/order/acceptforapprover/${orderId}`,{approverremark:approverremark},{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "approveOrdersforApproverSuccess",
      payload:data.approverremark
    });
  } catch (error) {
    dispatch({
      type: "approveOrdersforApproverFail",
      payload: error.response.data.message,
    });
  }
};



export const declineOrdersforApproverAction = (orderId,approverremark) => async (dispatch) => {
  try {
    dispatch({
      type: "declineOrdersforApproverRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const {data}=await axios.post(`${server}/order/rejectforapprover/${orderId}`,{approverremark:approverremark},{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({
      type: "declineOrdersforApproverSuccess",
      payload:data.approverremark
    });
  } catch (error) {
    dispatch({
      type: "declineOrdersforApproverFail",
      payload: error.response.data.message,
    });
  }
};


export const getApprovedOrderforVerifierAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "getApprovedofVerifierRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const {data}=await axios.get(`${server}/order/getapproved`, {
      withCredentials: true,
    });

    dispatch({
      type: "getApprovedofVerifierSuccess",
      payload:data.approvedOrder
    });
  } catch (error) {
    dispatch({
      type: "getApprovedofVerifierFail",
      payload: error.response.data.message,
    });
  }
}


export const getRejectedOrderforVerifierAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "getRejectedofVerifierRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const {data}=await axios.get(`${server}/order/getrejected`, {
      withCredentials: true,
    });

    dispatch({
      type: "getRejectedofVerifierSuccess",
      payload:data.rejectedOrder
    });
  } catch (error) {
    dispatch({
      type: "getRejectedofVerifierFail",
      payload: error.response.data.message,
    });
  }
}


export const getAllOrderArchivedActions=()=>async(dispatch)=>{
  try {
      dispatch({
          type: "getAllOrderArchiveRequest",
        });
    
      
    
        const { data } = await axios.get(`${server}/get/order/archive`,{
          withCredentials: true,
        });
    
        dispatch({
          type: "getAllOrderArchiveSuccess",
          payload: data.archivedOrders,
        });
  } catch (error) {
      dispatch({
          type: "getAllOrderArchiveFail",
          payload: error.response.data.message,
        });
  }
}
