import { ActionTypes } from "../constants/action-types";

export const loginUser = ({ username, token }) => {
  return {
    type: ActionTypes.LOGIN_USER,
    payload: { username, token },
  };
};

export const setError = (error) => {
  return {
    type: ActionTypes.SET_ERROR,
    payload: error,
  };
};
