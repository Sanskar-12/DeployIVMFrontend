import axios from "axios";
import { server } from "../store";

export const createVendorAction=(formData)=> async (dispatch)=>{
    try {
        dispatch({
          type: "createVendorRequest",
        });
    
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        const {data}= await axios.post(`${server}/vendor/add-vendor`,formData,config);
        console.log(data);
        dispatch({
            type: "createVendorsSuccess",
            payload: data.vendorData, 
          });
        } catch (error) {
          dispatch({
            type: "createVendorsFail",
            payload: error.response.data.message,
          });
        }


    }


    
export const getVendorDataByIDAction=(id)=> async (dispatch)=>{
  try {
      dispatch({
        type: "getVendorDataByIdRequest",
      });
  
     
      const {data}= await axios.get(`${server}/vendor/get-vendor-byId/${id}`,{
        withCredentials: true,
      });
      dispatch({
          type: "getVendorDataByIdSuccess",
          payload: data.vendor, 
        });
      } catch (error) {
        dispatch({
          type: "getVendorDataByIdFail",
          payload: error.response.data.message,
        });
      }


  }
