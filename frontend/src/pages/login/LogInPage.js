import React from 'react';
import { LogInForm } from './components/logInform/LogInForm';
import { FlexBox } from '../../core/components/atoms/FlexBox';
import { Text } from '../../core/components/atoms/Text';

export const LogInPage = () => {
  return (
    <FlexBox padding="10px 0">
      <FlexBox
        $elevation
        width="600px"
        height="50%"
        flexDirection="column"
        backgroundColor="white"
        justifyContent="center"
        padding="5%"
      >
        <Text fontWeight="bold" fontSize={1.5} fontColor="black">
          Log In
        </Text>
        <LogInForm />
      </FlexBox>
    </FlexBox>
  );
};
