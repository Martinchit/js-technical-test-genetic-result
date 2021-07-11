import React from "react";
import { shallow } from 'enzyme';
import * as redux from 'react-redux';
import 'jest-styled-components';
import { Button, Form } from 'semantic-ui-react';

import { LogInForm } from "../LogInForm";

describe("LogInForm", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  const mockState = {
    auth: {
      logInProcessing: false,
      logInError: null
    }
  };

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(mockState));
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("renders correctly", () => {
    const wrapper = shallow(<LogInForm />)
    expect(wrapper).toMatchSnapshot()
  })

  it("handles changes correctly", () => {
    const emailTestValue = 'email';
    const passwordTestValue = '123'
    const validEmailTestValue = 'test@test.com'
    const validPasswordTestValue = 'password'
    const wrapper = shallow(<LogInForm />)
    expect(wrapper).toMatchSnapshot()

    wrapper.find(Form.Input).at(0).simulate('change', { target: { value: emailTestValue }})
    expect(wrapper.find(Form.Input).at(0).props().value).toBe(emailTestValue)
    wrapper.find(Form.Input).at(1).simulate('change', { target: { value: passwordTestValue }})
    expect(wrapper.find(Form.Input).at(1).props().value).toBe(passwordTestValue)
    expect(wrapper.find(Button).at(0).props().disabled).toBe(true)
  
    wrapper.find(Form.Input).at(0).simulate('change', { target: { value: validEmailTestValue }})
    expect(wrapper.find(Form.Input).at(0).props().value).toBe(validEmailTestValue)
    expect(wrapper.find(Button).at(0).props().disabled).toBe(true)
  
    wrapper.find(Form.Input).at(1).simulate('change', { target: { value: validPasswordTestValue }})
    expect(wrapper.find(Form.Input).at(1).props().value).toBe(validPasswordTestValue)
    expect(wrapper.find(Button).at(0).props().disabled).toBe(false)

    wrapper.find(Button).at(0).simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'auth/reset', payload: undefined });
  })
})