import { GET_USERS } from "../types";

const initialState = {
  users: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
