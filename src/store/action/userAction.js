import { GET_USERS } from "../types";
import axios from "axios";
export const getUsers = () => async (dispatch) => {
  await axios
    .get(`https://restcountries.com/v3.1/all`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((e) => {
      // alert(e.response.data.message);
      alert(e);
      // console.log(e.response.status, e.response.data.message);
      dispatch({
        type: "ERROR",
        payload: e,
      });
    });
};
