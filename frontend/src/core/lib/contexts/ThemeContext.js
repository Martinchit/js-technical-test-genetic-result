import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Theme, GlobalStyle } from '../theme/globalStyle';

export const ThemeContextProvider = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node,
};
