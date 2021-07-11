import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';
import { FlexBox } from '../../../../core/components/atoms/FlexBox';
import { logInAction, reset } from '../../../../redux/auth/authSlice';
import {
  emailPattern,
  passwordPattern,
} from '../../../../core/lib/utils/regexPatterns';

export const LogInForm = () => {
  const dispatch = useDispatch();
  const logInProcessing = useSelector((state) => state.auth.logInProcessing);
  const logInError = useSelector((state) => state.auth.logInError);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailInvalidMessage] = React.useState(
    'Please make sure email is in correct pattern'
  );
  const [passwordInvalidMessage] = React.useState(
    'Please make sure password contains 8 alphanumeric characters'
  );

  const buttonContent = React.useMemo(() => {
    return logInProcessing ? 'Loading' : 'Log In';
  }, [logInProcessing]);

  const [isEmailInvalid, isPasswordInvalid] = React.useMemo(() => {
    const isEmailInvalid = !email || !emailPattern.test(email);
    const isPasswordInvalid = !password || !passwordPattern.test(password);
    return [isEmailInvalid, isPasswordInvalid];
  }, [email, password]);

  const updateEmail = React.useCallback(
    ({ target }) => {
      dispatch(reset());
      setEmail(target.value);
    },
    [dispatch]
  );

  const updatePassword = React.useCallback(
    ({ target }) => {
      dispatch(reset());
      setPassword(target.value);
    },
    [dispatch]
  );

  const logInFormOnSubmit = React.useCallback(() => {
    dispatch(logInAction(email, password));
  }, [dispatch, email, password]);

  return (
    <FlexBox flexDirection="column" height="auto">
      <Form
        error={logInError}
        warning={isEmailInvalid || isPasswordInvalid ? true : null}
      >
        <Form.Field>
          <Form.Input
            fluid
            label="Email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={updateEmail}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            fluid
            label="Email"
            placeholder="Password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
        </Form.Field>
        <Message error content={logInError} />
        <Message
          warning
          content={
            isEmailInvalid
              ? emailInvalidMessage
              : isPasswordInvalid
              ? passwordInvalidMessage
              : null
          }
        />
        <Button
          color="green"
          disabled={isPasswordInvalid || isEmailInvalid}
          type="submit"
          onClick={logInFormOnSubmit}
        >
          {buttonContent}
        </Button>
      </Form>
    </FlexBox>
  );
};
