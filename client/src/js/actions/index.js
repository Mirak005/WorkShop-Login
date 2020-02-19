import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS, REGISTER_USER } from "../const/actionTypes";

export const registerUser = cred => async dispatch => {
  dispatch({type:REGISTER_USER})
  try {
    const registerResult = await axios.post("/register", cred);
    if (registerResult.status === 200)
      return dispatch({
        type: REGISTER_SUCCESS,
        payload: registerResult.data
      });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response
    });
  }
};
