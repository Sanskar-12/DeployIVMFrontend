import axios from "axios";
import { server } from "../store";

export const createPurchaseOrderAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "createPurchaseOrdersRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/create/purchaseorder`, 
      {
       general_Information: {
        reference_number: formData.general_Information.reference_number,
        to: formData.general_Information.to,
        subject: formData.general_Information.subject,
        letter: formData.general_Information.letter,
      },

      table_Data: formData.table_Data,
      terms_and_conditions: {
        payment: formData.terms_and_conditions.payment,
        waranty: formData.terms_and_conditions.waranty,
        delivery: formData.terms_and_conditions.delivery,
      },
      },
      config
    );
    console.log(data);
    dispatch({
      type: "createPurchaseOrdersSuccess",
      payload: data.purchaseOrderdata, 
    });
  } catch (error) {
    dispatch({
      type: "createPurchaseOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const getPurchaseOrderDataAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getPurchaseOrdersDataRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${server}/get/purchaseorder/${id}`, 
      config
    );
    console.log(data);
    dispatch({
      type: "getPurchaseOrdersDataSuccess",
      payload: data.purchaseOrderdata,
    });
  } catch (error) {
    dispatch({
      type: "getPurchaseOrdersDataFail",
      payload: error.response.data.message,
    });
  }
};



export const getAllPurchaseOrderDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllPurchaseOrdersDataRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${server}/get/all/purchaseorder`, 
      config
    );
    dispatch({
      type: "getAllPurchaseOrdersDataSuccess",
      payload: data.allpurchaseOrderdata,
    });
  } catch (error) {
    dispatch({
      type: "getAllPurchaseOrdersDataFail",
      payload: error.response.data.message,
    });
  }
};



export const deletePurchaseOrderDataAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePurchaseOrdersDataRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `/api/v1/delete/purchaseorder/${id}`, 
      config
    );
    dispatch({
      type: "deletePurchaseOrdersDataSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePurchaseOrdersDataFail",
      payload: error.response.data.message,
    });
  }
};

