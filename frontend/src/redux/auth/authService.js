import axios from 'axios';

export const logInService = async (email, password) => {
  const reqBody = {
    email,
    password,
  };
  const { data } = await axios({
    method: 'POST',
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    url: '/api/auth/log-in',
    data: {
      ...reqBody,
    },
  });
  return data.token;
};
