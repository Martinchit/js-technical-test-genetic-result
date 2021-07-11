import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import { FlexBox } from '../atoms/FlexBox';

const LoadingSpinnerSizes = ['tiny', 'small', 'medium', 'large', 'huge'];

export const LoadingSpinner = ({ size, inverted }) => (
  <FlexBox flexDirection="column" height="100vh">
    <Dimmer active inverted={inverted}>
      <Loader size={size}>Loading...</Loader>
    </Dimmer>
  </FlexBox>
);

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(LoadingSpinnerSizes),
  inverted: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  size: 'medium',
  inverted: false,
};
