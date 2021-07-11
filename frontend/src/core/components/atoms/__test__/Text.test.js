import React from "react";
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { Text } from "../Text";
import { Theme } from "../../../lib/theme/globalStyle";

describe("Text", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Text theme={Theme}  />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toHaveStyleRule('font-weight', '400')
  })

  it("renders font-weight 200", () => {
    const wrapper = shallow(<Text fontWeight="light" theme={Theme} />)
    expect(wrapper).toHaveStyleRule('font-weight', '200')
  })

  it("renders font-weight 400", () => {
    const wrapper = shallow(<Text fontWeight="normal" theme={Theme} />)
    expect(wrapper).toHaveStyleRule('font-weight', '400')
  })

  it("renders font-weight 600", () => {
    const wrapper = shallow(<Text fontWeight="bold" theme={Theme} />)
    expect(wrapper).toHaveStyleRule('font-weight', '600')
  })

  it("renders font-weight 800", () => {
    const wrapper = shallow(<Text fontWeight="extra-bold" theme={Theme}/>)
    expect(wrapper).toHaveStyleRule('font-weight', '800')
  })

  it("renders current font-size", () => {
    const wrapper = shallow(<Text fontSize={1} theme={Theme} />)
    expect(wrapper).toHaveStyleRule('font-size', '1rem')
  })
})