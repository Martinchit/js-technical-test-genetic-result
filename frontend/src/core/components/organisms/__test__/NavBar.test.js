import React from "react";
import { shallow, mount } from 'enzyme';
import * as redux from 'react-redux';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import 'jest-styled-components';

import { NavBar } from "../NavBar";
import { store } from '../../../../redux/store';
import { logInSuccess } from '../../../../redux/auth/authSlice';

describe("NavBar", () => {
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly", () => {
    const wrapper = shallow(<NavBar />)
    expect(wrapper).toMatchSnapshot()
  })

  it("renders correctly after log in", () => {
    const wrapper = shallow(<NavBar loggedIn />)
    expect(wrapper.find(Menu.Item).length).toBe(3)
    expect(wrapper.find(Dropdown.Menu).length).toBe(1)
    expect(wrapper.find(Dropdown.Item).length).toBe(2)
    wrapper.find('#navbar-logout-button').simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'auth/logOut', payload: undefined })
  })
})