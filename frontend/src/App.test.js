import React from "react";
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { App } from './App';

describe("App", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Provider store={store}><App /></Provider>);
    expect(wrapper).toMatchSnapshot()
  });
});
