import { createGlobalStyle } from 'styled-components';

export const Theme = {
  fonts: {},
  colors: {
    primary: '#3772ff',
    secondary: '#F4F4F4',
    success: '#2bab24',
    danger: '#E71D36',
    warning: '#FF9F1C',
    black: '#011627',
    white: '#FDFFFC',
    grey: '#717171',
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
  }
  body {
    min-height: 100vh;
    min-width: 100vw;
    background-color: ${Theme.colors.secondary};
  }
  
  h1, h2, h3, h4, h5, h6 {
    letter-spacing: normal;
  }

  .ui.form {
    width: 100%;
  }
`;
