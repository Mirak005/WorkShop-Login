import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../const/actionTypes";

const initState = {
  isAuth: false,
  isLoading: false,
  data: []
};

export default function(state = initState, { type, payload }) {

  switch (type) {

    case REGISTER_USER:
      return { ...state, isLoading: true };

    case REGISTER_SUCCESS:
      return { ...state, isAuth: true, isLoading: false, data: payload };
      
    case REGISTER_FAIL:
      return { ...state, isLoading: false, isAuth: false, data: payload };
    default:
      return state;
  }
}
