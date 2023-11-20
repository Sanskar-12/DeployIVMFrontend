import axios from "axios";
import { server } from "../store";

export const getAllInwardActions=()=>async(dispatch)=>{
    try {
        dispatch({
            type: "getAllInwardRequest",
          });
      
        
      
          const { data } = await axios.get(`${server}/order/inwardorders`,{
            withCredentials: true,
          });
      
          dispatch({
            type: "getAllInwardSuccess",
            payload: data.orders,
          });
    } catch (error) {
        dispatch({
            type: "getAllInwardFail",
            payload: error.response.data.message,
          });
    }
}


export const changeStatusActions=(id,status)=>async(dispatch)=>{
    try {
        dispatch({
            type: "changeStatusRequest",
          });
      
        
      
           await axios.put(`${server}/change/status/${id}`,{status},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true,
          });
      
          dispatch({
            type: "changeStatusSuccess",
          });
    } catch (error) {
        dispatch({
            type: "changeStatusFail",
            payload: error.response.data.message,
          });
    }
}


export const getAllInwardArchivedActions=()=>async(dispatch)=>{
  try {
      dispatch({
          type: "getAllInwardArchiveRequest",
        });
    
      
    
        const { data } = await axios.get(`${server}/get/inward/archived/orders`,{
          withCredentials: true,
        });
    
        dispatch({
          type: "getAllInwardArchiveSuccess",
          payload: data.archivedOrders,
        });
  } catch (error) {
      dispatch({
          type: "getAllInwardArchiveFail",
          payload: error.response.data.message,
        });
  }
}

