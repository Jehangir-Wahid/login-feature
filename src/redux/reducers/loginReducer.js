import { ActionTypes } from "../constants/action-types";

export const loginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        error: "",
        username: payload.username,
        token: payload.token,
      };
    case ActionTypes.SET_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};
