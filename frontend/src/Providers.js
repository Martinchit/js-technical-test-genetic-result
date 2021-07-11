import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import { ThemeContextProvider } from './core/lib/contexts/ThemeContext';

export const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </ReduxProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.node,
};
