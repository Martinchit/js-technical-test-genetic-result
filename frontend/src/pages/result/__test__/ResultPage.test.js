import React from "react";
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

import { ResultPage } from "../ResultPage";

describe("ResultPage", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  const mockState = {
    auth: {
      token: 'test',
      loggedIn: true
    }
  };

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
    const wrapper = shallow(<ResultPage />)
    expect(wrapper).toMatchSnapshot()
  })
})