import React from "react";
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { Spacer } from "../Spacer";
import { Theme } from "../../../lib/theme/globalStyle";

describe("Spacer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Spacer theme={Theme}  />)
    expect(wrapper).toMatchSnapshot()
  })
})