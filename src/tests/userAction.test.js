import moxios from "moxios";
import { getUsers } from "../store/action/userAction";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../store/reducers";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const middlewares = [thunk];
const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

const mockStore = configureStore(middlewares);

describe("fetchPosts action", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("Store is updated correctly", () => {
    const expectedState = [
      {
        region: "asia",
        name: { common: "india" },
      },
      {
        region: "asia",
        name: { common: "china" },
      },
    ];
    const store = testStore();
    // console.log(store);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(getUsers()).then(() => {
      const newState = store.getState();
      let updatedState = newState.users;
      expect(updatedState.users).toBe(expectedState);
      expect(updatedState.error).toBe(null);
    });
  });

  test("request is rejected", () => {
    const res = {
      status: 404,
      response: { message: "Page Not Found" },
    };
    const store = testStore();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.reject(res);
    });
    return store.dispatch(getUsers()).then(() => {
      const newState = store.getState();
      let Error = newState.users.error;
      expect(Error.response.message).toEqual("Page Not Found");
      expect(Error.status).toBe(404);
    });
  });

  test("check action type", () => {
    const store = mockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: "expectedState",
      });
    });

    return store.dispatch(getUsers()).then(() => {
      const actions = store.getActions();
      console.log(actions);
      expect(actions[0].type).toEqual("GET_USERS");
    });
  });

  test("request is rejected type check", () => {
    const store = mockStore();

    const res = {
      status: 404,
      response: { message: "Page Not Found" },
    };
    // const store = testStore();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.reject(res);
    });
    return store.dispatch(getUsers()).then(() => {
      const actions = store.getActions();
      // console.log(actions);
      expect(actions[0].type).toEqual("ERROR");
    });
  });
});
