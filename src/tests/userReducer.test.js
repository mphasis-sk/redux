import userReducer from "../store/reducers/userReducer";
import { GET_USERS } from "../store/types";

describe("rendering userReducer", () => {
  it("should return default state", () => {
    const newState = userReducer(undefined, {});
    expect(newState).toEqual({ users: [], error: null });
  });

  it("should return new state if recieves GET_USERS", () => {
    const usersArr = [{ regions: "asia" }];
    const newState = userReducer(undefined, {
      type: GET_USERS,
      payload: usersArr,
    });
    expect(newState).toEqual({ users: usersArr, error: null });
  });
});
