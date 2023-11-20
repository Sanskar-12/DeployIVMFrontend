import axios from "axios";
import { server } from "../store";
// import {server} from "../store"

export const loginAction = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/login`,
      { username, password },
      config
    );

    dispatch({
      type: "loginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};

export const getUserDetailAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const { data } = await axios.get(`${server}/me`,{
      withCredentials: true,
    });

    dispatch({
      type: "loadUserSuccess",
      payload: data.user
    })
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });


    // const config={
    //   withCredentials: true,
    // }

    await axios.get(`${server}/logout`,{
      withCredentials: true,
    });

    dispatch({
      type: "logoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};
