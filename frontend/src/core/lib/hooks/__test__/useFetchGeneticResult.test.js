import axios from "axios";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import * as redux from 'react-redux';
import { act } from "react-dom/test-utils";

import { useFetchGeneticResult } from "../useFetchGeneticResult";

jest.mock('axios');

describe("useFetchGeneticResult", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let container = null;
  const error = 'testError';
  const result = {
    id: '1',
    title: 'delectus aut autem',
    test: true
  }
  const waitForAsync = () => new Promise(resolve => setImmediate(resolve))
  const mockState = {
    auth: {
      token: 'test',
      loggedIn: true
    }
  };

  const TestComponent = () => {
    const [result, error, loading] = useFetchGeneticResult();
    return (
      <React.Fragment>
        <p>{JSON.stringify(result)}</p>
        <h1>{String(error)}</h1>
        <h2>{String(loading)}</h2>
      </React.Fragment>
    );
  }

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(mockState));
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
    container = document.createElement("div");
    document.body.appendChild(container);
  })

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.restoreAllMocks();
  });

  it("fetches data success", async (done) => {
    axios.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          result
        }
      })
    });

    act(() => {
      render(<TestComponent />, container);
    });
    expect(container.querySelector('h2').textContent).toBe('true');
    await waitForAsync();

    expect(container.querySelector('p').textContent).toBe(JSON.stringify(result))
    expect(container.querySelector('h1').textContent).toBe('false');
    expect(container.querySelector('h2').textContent).toBe('false');

    expect(axios).toHaveBeenCalled()
    axios.mockRestore();
    done();
  });

  it("fetches data error", async (done) => {
    axios.mockImplementationOnce(() => {
      return Promise.reject({
        data: {
          error
        }
      })
    });

    act(() => {
      render(<TestComponent />, container);
    });
    expect(container.querySelector('h2').textContent).toBe('true');
    await waitForAsync();

    expect(container.querySelector('p').textContent).toBe('{}')
    expect(container.querySelector('h1').textContent).toBe('true');
    expect(container.querySelector('h2').textContent).toBe('false');

    expect(axios).toHaveBeenCalled()
    axios.mockRestore();
    done();
  });

  it("fetches data unauthorized error", async (done) => {
    axios.mockImplementationOnce(() => {
      return Promise.reject({
        response: {
          status: 401
        }
      })
    });

    act(() => {
      render(<TestComponent />, container);
    });
    expect(container.querySelector('h2').textContent).toBe('true');
    await waitForAsync();
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'auth/logOut', payload: undefined });
    expect(axios).toHaveBeenCalled()
    axios.mockRestore();
    done();
  });
})