import React from "react";
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { LogInPage } from "../LogInPage";

describe("LogInPage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<LogInPage />)
    expect(wrapper).toMatchSnapshot()
  })
})