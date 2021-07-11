import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { LogInPage } from './pages/login/LogInPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { ResultPage } from './pages/result/ResultPage';
import { FlexBox } from './core/components/atoms/FlexBox';
import { NavBar } from './core/components/organisms/NavBar';
import { LoadingSpinner } from './core/components/molecules/LoadingSpinner';
import { checkLocalStorageAction } from './redux/auth/authSlice';

export const App = () => {
  const dispatch = useDispatch();
  const isLocalStorageChecked = useSelector(
    (state) => state.auth.isLocalStorageChecked
  );
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  React.useEffect(() => {
    if (!isLocalStorageChecked) {
      dispatch(checkLocalStorageAction());
    }
    return () => false;
  }, [dispatch, isLocalStorageChecked]);

  return (
    <React.Fragment>
      <Router>
        <NavBar loggedIn={loggedIn} />
        {isLocalStorageChecked ? (
          <FlexBox padding="70px 10%">
            {loggedIn ? (
              <Switch>
                <Route exact path="/result" component={ResultPage} />
                <Route path="/profile" component={ProfilePage} />
                <Redirect from="*" to={'/result'} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/log-in" component={LogInPage} />
                <Redirect from="*" to={'/log-in'} />
              </Switch>
            )}
          </FlexBox>
        ) : (
          <LoadingSpinner />
        )}
      </Router>
    </React.Fragment>
  );
};
