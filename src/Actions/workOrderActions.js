import axios from "axios";
import { server } from "../store";

export const createWorkOrderAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "createWorkOrdersRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/create/workorder`, 
      {
        general_Information: {
          reference_number: formData.general_Information.reference_number,
          subject: formData.general_Information.subject,
          letter: formData.general_Information.letter,
        },
        taxation_Details: {
          current_total_amount: formData.taxation_Details.current_total_amount,
          discount: formData.taxation_Details.discount,
          total_after_discount: formData.taxation_Details.total_after_discount,
          cgst: formData.taxation_Details.cgst,
          scgst: formData.taxation_Details.scgst,
          final_total_amount: formData.taxation_Details.final_total_amount,
        },
        table_Data: formData.table_Data,
      },
      config
    );
    console.log(data);
    dispatch({
      type: "createWorkOrdersSuccess",
      payload: data.workOrderdata, 
    });
  } catch (error) {
    dispatch({
      type: "createWorkOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const getWorkOrderDataAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getWorkOrdersDataRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${server}/get/workorder/${id}`, 
      config
    );
    console.log(data);
    dispatch({
      type: "getWorkOrdersDataSuccess",
      payload: data.workOrderdata,
    });
  } catch (error) {
    dispatch({
      type: "getWorkOrdersDataFail",
      payload: error.response.data.message,
    });
  }
};


export const getAllWorkOrderDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllWorkOrdersDataRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(
      `/api/v1/get/all/workorder`, 
      config
    );
    dispatch({
      type: "getAllWorkOrdersDataSuccess",
      payload: data.allworkOrderdata,
    });
  } catch (error) {
    dispatch({
      type: "getAllWorkOrdersDataFail",
      payload: error.response.data.message,
    });
  }
};




export const deleteWorkOrderDataAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteWorkOrdersDataRequest",
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `/api/v1/delete/workorder/${id}`, 
      config
    );
    dispatch({
      type: "deleteWorkOrdersDataSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteWorkOrdersDataFail",
      payload: error.response.data.message,
    });
  }
};


