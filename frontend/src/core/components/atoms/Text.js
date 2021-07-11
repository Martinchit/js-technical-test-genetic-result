import styled from 'styled-components';
import PropTypes from 'prop-types';

const WeightProps = ['light', 'normal', 'bold', 'extra-bold'];

const getFontWeight =
  ({ fontWeight }) =>
  () => {
    switch (fontWeight) {
      case 'light':
        return '200';
      case 'normal':
        return '400';
      case 'bold':
        return '600';
      case 'extra-bold':
        return '800';
      default:
        return '400';
    }
  };

const setDefaultValue = () => 'margin: 0px;padding: 0px;border:0;';

export const Text = styled.p`
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  font-weight: ${getFontWeight};
  color: ${({ theme, fontColor }) => theme['colors'][fontColor]};
  text-align: ${({ textAlign }) => textAlign};
  ${setDefaultValue}
`;

Text.propTypes = {
  fontSize: PropTypes.number,
  fontWeight: PropTypes.oneOf(WeightProps),
  fontColor: PropTypes.string,
  textAlign: PropTypes.string,
};

Text.defaultProps = {
  fontSize: 1,
  fontWeight: 'normal',
  fontColor: 'primary',
  testAlign: 'left',
};
