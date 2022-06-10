import Users from "../component/users";
import store from "../store/store";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import React from "react";
import checkPropTypes from "check-prop-types";
import sinon from "sinon";

test("should test Provider component", () => {
  const wrapper = shallow(<Provider store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test("should test Users component", () => {
  const wrapper = shallow(<Users store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test("check proptypes", () => {
  const exp = {
    reg: [],
    changeRegion: () => {},
    componentDidMount: () => {},
  };
  const propsErr = checkPropTypes(Users.propTypes, exp, "props", Users.name);
  expect(propsErr).toBeUndefined();
});

const setUp = (initialState) => {
  const wrapper = shallow(<Users store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe("Users testing", () => {
  let wrapper;
  let regions = [
    {
      region: "asia",
      name: { common: "india" },
    },
  ];
  let initialState = {
    regions,
    error: null,
  };
  beforeEach(() => {
    wrapper = setUp(initialState);
  });

  test("render dropdowns", () => {
    expect(wrapper.find("select").length).toBe(2);
  });

  it("should render dropdown items", () => {
    expect(wrapper.find("option")).toHaveLength(5);
  });

  it("find country select tag", () => {
    expect(wrapper.find("#country")).toHaveLength(1);
  });

  test("check changeRegion function is called", () => {
    const selChange = sinon.spy();
    const select = shallow(<select onChange={selChange} />);
    select.find("select").at(0).simulate("change");
    expect(selChange.calledOnce).toBe(true);
  });
});
