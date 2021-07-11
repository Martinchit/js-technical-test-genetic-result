import { createSlice } from '@reduxjs/toolkit';
import { logInService } from './authService';
import { updateObject } from '../../core/lib/utils/updateObject';
import {
  setAuthToken,
  removeAuthToken,
  retrieveAuthToken,
} from '../../core/lib/utils/localStorage';

export const initialState = {
  isLocalStorageChecked: false,
  logInProcessing: false,
  loggedIn: false,
  logInError: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: {
      reducer: (state) => {
        return updateObject(state, { logInError: null, logInProcessing: false });
      },
    },
    logInProcessing: {
      reducer: (state) => {
        return updateObject(state, { logInProcessing: true });
      },
    },
    logInSuccess: {
      reducer: (state, action) => {
        const { token } = action['payload'];
        return updateObject(state, {
          token,
          loggedIn: true,
          logInProcessing: false,
        });
      },
      prepare: (token) => ({
        payload: {
          token,
        },
      }),
    },
    logInError: {
      reducer: (state, action) => {
        const { error } = action['payload'];
        return updateObject(state, { logInError: error, logInProcessing: false });
      },
      prepare: (error) => ({ payload: { error } }),
    },
    logOut: (state) => {
      removeAuthToken();
      return updateObject(state, {
        token: null,
        loggedIn: false,
      });
    },
    localStorageCheckCompleted: {
      reducer: (state, action) => {
        const { token } = action['payload'];
        return updateObject(state, {
          token,
          isLocalStorageChecked: true,
          loggedIn: token ? true : false,
        });
      },
      prepare: (token) => ({ payload: { token } }),
    },
  },
});

export const {
  isLocalStorageChecked,
  logInSuccess,
  logInError,
  loggedIn,
  logOut,
  reset,
  logInProcessing,
  localStorageCheckCompleted,
} = authSlice.actions;

export default authSlice.reducer;

export const logInAction = (email, password) => async (dispatch) => {
  dispatch(reset());
  dispatch(logInProcessing());
  try {
    const token = await logInService(email, password);
    setAuthToken(token);
    dispatch(logInSuccess(token));
  } catch (err) {
    const { data } = err.response;
    dispatch(logInError(data.description));
  }
};

export const checkLocalStorageAction = () => (dispatch) => {
  const token = retrieveAuthToken();
  dispatch(localStorageCheckCompleted(token));
};
