import axios from "axios";
import { server } from "../store";
// import { server } from "../store";

export const getAllInventoryAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllInventoryRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

    const { data } = await axios.get(`${server}/get/inventory/products`,{
      
      withCredentials: true,
    });

    dispatch({
      type: "getAllInventorySuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllinventoryFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteInventoryAction = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteInventoryRequest",
    });

    // const options = {
    //   withCredentials: true,
    // };

   await axios.delete(`${server}/delete/product/${productId}`,{
    withCredentials:true
   });

    dispatch({
      type: "deleteInventorySuccess",
      
    });
  } catch (error) {
    dispatch({
      type: "deleteInventoryFail",
      payload: error.response.data.message,
    });
  }
};