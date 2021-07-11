import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logOut } from '../../../redux/auth/authSlice';

export const useFetchGeneticResult = (type) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});
  const [error, setError] = useState(false);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
          url: '/api/genetic/result',
          params: {
            type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResult(data.result);
      } catch (e) {
        const { response } = e;
        if (response && response.status === 401) {
          dispatch(logOut());
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    if (loggedIn && token) {
      fetchProfile();
    }
    return () => false;
  }, [loggedIn, token, dispatch, type]);

  return [result, error, loading];
};
