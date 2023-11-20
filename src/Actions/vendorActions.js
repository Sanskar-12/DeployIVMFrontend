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
