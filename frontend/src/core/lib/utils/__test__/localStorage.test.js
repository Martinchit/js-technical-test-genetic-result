import { retrieveAuthToken, removeAuthToken, setAuthToken } from '../localStorage';

describe('localStorage function', () => {
  beforeEach(() => {
      const localStorageMock = (function() {
      let store = {}
      return {
        getItem: function(key) {
          return store[key] || null
        },
        setItem: function(key, value) {
          store[key] = value.toString()
        },
        removeItem: function(key) {
          delete store[key]
        },
        clear: function() {
          store = {}
        },
      }
    })()

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    })
  })

  it('handles functions correctly', () => {
    const token = "token";
    setAuthToken(token);
    expect(retrieveAuthToken()).toBe(token);
    removeAuthToken();
    expect(retrieveAuthToken()).toBe(null);
  });
});