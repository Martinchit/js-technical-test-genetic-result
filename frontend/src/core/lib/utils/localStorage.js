export const retrieveAuthToken = () => {
  return localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN);
};

export const removeAuthToken = () => {
  localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN);
};

export const setAuthToken = (token) => {
  localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN, token);
};
