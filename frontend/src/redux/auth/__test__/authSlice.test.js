import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, {
  initialState,
  localStorageCheckCompleted,
  logInAction,
  checkLocalStorageAction,
  logInSuccess,
  logInError,
  logOut,
  reset,
  logInProcessing,
} from '../authSlice';

jest.mock('axios');
describe('authSlice', () => {
  const middleware = [thunk];
  const mockStore = configureStore(middleware);
  const store = mockStore({});
  const waitForAsync = () => new Promise(resolve => setImmediate(resolve))
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => null);
  const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => null);
  const email = 'test@test.com';
  const password = 'testPassword';
  const token = 'testToken';
  const error = 'Test Error';

  it('returns initial state', () => {
    const result = reducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('reset error value on reset', () => {
    const state = { ...initialState, logInError, logInProcessing: true }
    const updatedState = reducer(state, reset());

    expect(updatedState['logInError']).toBe(null);
    expect(updatedState['logInProcessing']).toBe(false);
  });

  it('sets submissionProcessing values on formSubmissionProcessing', () => {
    const updatedState = reducer(initialState, logInProcessing());
    expect(updatedState['logInProcessing']).toBeTruthy();
  });

  it('updates state values on logInSuccess', () => {
    const token = 'testToken';

    let updatedState = reducer(initialState, logInProcessing());
    expect(updatedState['logInProcessing']).toBeTruthy();
    updatedState = reducer(initialState, logInSuccess(token));
    expect(updatedState['token']).toBe(token);
    expect(updatedState['logInProcessing']).not.toBeTruthy();
    expect(updatedState['loggedIn']).toBeTruthy();
  });

  it('sets error value on logInError', () => {
    let updatedState = reducer(initialState, logInProcessing());
    expect(updatedState['logInProcessing']).toBeTruthy();
    updatedState = reducer(initialState, logInError(error));
    expect(updatedState['logInError']).toStrictEqual(error);
    expect(updatedState['logInProcessing']).not.toBeTruthy();
  });

  it('updates state values on logOut', () => {
    let updatedState = reducer(initialState, logInProcessing());
    expect(updatedState['logInProcessing']).toBeTruthy();
    updatedState = reducer(initialState, logInSuccess(token));
    expect(updatedState['token']).toBe(token);
    expect(updatedState['logInProcessing']).not.toBeTruthy();
    expect(updatedState['loggedIn']).toBeTruthy();
    updatedState = reducer(initialState, logOut());
    expect(updatedState['token']).toBe(null);
    expect(updatedState['loggedIn']).not.toBeTruthy();
    expect(removeItemSpy).toHaveBeenCalled();
  });

  it('sets state values on checkLoggedInComplete when token is found', () => {
    const updatedState = reducer(initialState, localStorageCheckCompleted(token));
    expect(updatedState['isLocalStorageChecked']).toBeTruthy();
    expect(updatedState['loggedIn']).toBeTruthy();
  });

  it('sets state values on checkLoggedInComplete when token is not found', () => {
    const updatedState = reducer(initialState, localStorageCheckCompleted());
    expect(updatedState['isLocalStorageChecked']).toBeTruthy();
    expect(updatedState['loggedIn']).not.toBeTruthy();
  });

  it('handles logInAction success case', async (done) => {
    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          token
        }
      })
    });
    store.dispatch(logInAction(email, password))
    await waitForAsync();
    expect(setItemSpy).toHaveBeenCalled();
    expect(axios).toHaveBeenCalled();
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios.mock.calls[0][0].method).toBe('POST');
    expect(axios.mock.calls[0][0].url).toBe('/api/auth/log-in');
    const formBody = axios.mock.calls[0][0].data;
    expect(formBody['email']).toBe(email);
    expect(formBody['password']).toBe(password);
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0]).toStrictEqual({
      type: 'auth/reset',
      payload: undefined
    })
    expect(dispatchedActions[1]).toStrictEqual({
      type: 'auth/logInProcessing',
      payload: undefined
    })
    expect(dispatchedActions[2]['type']).toBe('auth/logInSuccess')
    expect(dispatchedActions[2]['payload']['token']).toBe(token)
    axios.mockRestore();
    done();
  })

  it('handles logInAction error case', async (done) => {
    store.clearActions()
    axios.mockImplementationOnce(() => {
      return Promise.reject({
        response: {
          data: {
            description: error
          },
        }
      })
    });
    store.dispatch(logInAction(email, password))
    await waitForAsync();
    expect(axios).toHaveBeenCalled();
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios.mock.calls[0][0].method).toBe('POST');
    expect(axios.mock.calls[0][0].url).toBe('/api/auth/log-in');
    const formBody = axios.mock.calls[0][0].data;
    expect(formBody['email']).toBe(email);
    expect(formBody['password']).toBe(password);
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0]).toStrictEqual({
      type: 'auth/reset',
      payload: undefined
    })
    expect(dispatchedActions[1]).toStrictEqual({
      type: 'auth/logInProcessing',
      payload: undefined
    })
     expect(dispatchedActions[2]).toStrictEqual({
      type: 'auth/logInError',
      payload: {
        error
      }
    })
    axios.mockRestore();
    done()
  })

  it('handles localStorageCheckCompleted success case', async (done) => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => token);
    store.clearActions()
    store.dispatch(checkLocalStorageAction())
    expect(getItemSpy).toHaveBeenCalled();
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0]).toStrictEqual({
      type: 'auth/localStorageCheckCompleted',
      payload: {
        token
      }
    })
    done()
  })

  it('handles localStorageCheckCompleted when not token found in localStorage', async (done) => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);
    store.clearActions()
    store.dispatch(localStorageCheckCompleted());
    expect(getItemSpy).toHaveBeenCalled();
    const dispatchedActions = store.getActions();
    expect(dispatchedActions[0]).toStrictEqual({
      type: 'auth/localStorageCheckCompleted',
      payload: {
        token: undefined
      }
    })
    done()
  })
});