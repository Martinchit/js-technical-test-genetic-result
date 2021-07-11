import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import { ImCool } from 'react-icons/im';
import { logOut } from '../../../redux/auth/authSlice';

export const NavBar = ({ loggedIn }) => {
  const dispatch = useDispatch();

  const logOutAction = React.useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  const navButtons = React.useMemo(
    () =>
      loggedIn
        ? [
            {
              text: 'Result',
              name: 'result',
              url: '/result',
            },
          ]
        : [],
    [loggedIn]
  );

  return (
    <Menu stackable size="massive" fixed="top" id="navbar">
      <Menu.Item as={Link} to="/">
        <ImCool size="1.5em" />
      </Menu.Item>
      {loggedIn ? (
        <React.Fragment>
          {navButtons.map(({ text, name, url }) => (
            <Menu.Item key={name} name={name} as={Link} to={url}>
              {text}
            </Menu.Item>
          ))}
          <Menu.Menu position="right">
            <Menu.Item name="name" as={Dropdown} trigger={<Icon name="user" />}>
              <Dropdown.Menu>
                <Dropdown.Item text="Profile" as={Link} to="/profile" />
                <Dropdown.Item
                  text="Log Out"
                  onClick={logOutAction}
                  id="navbar-logout-button"
                />
              </Dropdown.Menu>
            </Menu.Item>
          </Menu.Menu>
        </React.Fragment>
      ) : null}
    </Menu>
  );
};

NavBar.propTypes = {
  loggedIn: PropTypes.bool,
};

NavBar.defaultProps = {
  loggedIn: false,
};
