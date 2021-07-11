import styled from 'styled-components';
import PropTypes from 'prop-types';

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  position: ${({ position }) => position};
  background-color: ${({ backgroundColor, theme }) =>
    theme['colors'][backgroundColor]
      ? theme['colors'][backgroundColor]
      : backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ $elevation }) =>
    $elevation
      ? 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
      : 'none'};
`;

FlexBox.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  flexDirection: PropTypes.string,
  flexWrap: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  position: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
  $elevation: PropTypes.bool,
};

FlexBox.defaultProps = {
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  margin: '0',
  padding: '0',
  position: 'relative',
  backgroundColor: 'transparent',
  borderRadius: '0px',
  $elevation: false,
};
