import React from "react";
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { InfoItem } from "../InfoItem";
import { Theme } from "../../../lib/theme/globalStyle";

describe("InfoItem", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<InfoItem />)
    expect(wrapper).toMatchSnapshot()
  })

  it("renders correctly with array description", () => {
    const description = ['testOne', 'testTwo']
    const wrapper = shallow(<InfoItem description={description} />)
    expect(wrapper).toMatchSnapshot()
  })
})