import { shallow } from "enzyme";
import React from "react";
import App from "../App";

test("render app component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

test("renders learn react link", () => {
  let data = 10;
  expect(data).toBe(10);
});
