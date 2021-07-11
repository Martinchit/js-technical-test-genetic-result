import React from "react";
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

import { ProfilePage } from "../ProfilePage";

describe("ProfilePage", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  const mockState = {
    auth: {
      token: 'test',
      loggedIn: true
    }
  };
  const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(mockState));
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it("renders correctly", () => {
    const wrapper = shallow(<ProfilePage />)
    expect(wrapper).toMatchSnapshot()
  })
})