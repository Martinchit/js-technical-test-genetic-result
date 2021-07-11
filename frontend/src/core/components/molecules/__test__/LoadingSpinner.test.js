import React from "react";
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { LoadingSpinner } from "../LoadingSpinner";
import { Theme } from "../../../lib/theme/globalStyle";

describe("LoadingSpinner", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<LoadingSpinner />)
    expect(wrapper).toMatchSnapshot()
  })
})