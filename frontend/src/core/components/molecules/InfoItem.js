import React from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from '../atoms/FlexBox';
import { Text } from '../atoms/Text';
import { Spacer } from '../atoms/Spacer';
import { convertInfoItemData } from '../../lib/utils/dataConversion';

export const InfoItem = ({ header, description }) => {
  return (
    <FlexBox flexDirection="column" alignItems="flex-start">
      <Text fontSize={1.5} fontColor="grey">
        {header}
      </Text>
      <FlexBox flexDirection="column" alignItems="flex-start" margin="3px 1px">
        {Array.isArray(description) ? (
          description.map((t) => (
            <Text fontSize={1.2} key={t}>
              {convertInfoItemData(header, t)}
            </Text>
          ))
        ) : (
          <Text fontSize={1.2}>{convertInfoItemData(header, description)}</Text>
        )}
      </FlexBox>
      <Spacer />
    </FlexBox>
  );
};

InfoItem.propTypes = {
  header: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

InfoItem.defaultProps = {
  header: '',
  description: '',
};
