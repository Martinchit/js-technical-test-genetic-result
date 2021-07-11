import React from 'react';
import { Message } from 'semantic-ui-react';
import { InfoItem } from '../../core/components/molecules/InfoItem';
import { FlexBox } from '../../core/components/atoms/FlexBox';
import { Text } from '../../core/components/atoms/Text';
import { LoadingSpinner } from '../../core/components/molecules/LoadingSpinner';
import { useFetchProfile } from '../../core/lib/hooks/useFetchProfile';

export const ProfilePage = () => {
  const [profile, error, loading] = useFetchProfile();

  const headerMapping = React.useMemo(
    () => ({
      id: 'User ID',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      dateOfBirth: 'Date Of Birth',
      createdAt: 'Created At',
    }),
    []
  );

  console.log(profile, loading, error);

  return (
    <FlexBox $elevation padding="5%" flexDirection="column" backgroundColor="white">
      <Text fontSize={1.8} fontColor="black">
        Profile
      </Text>
      <FlexBox flexDirection="column" margin="10px 0">
        {loading ? (
          <LoadingSpinner inverted />
        ) : !error ? (
          <React.Fragment>
            {Object.entries(profile).map(([k, v]) => (
              <InfoItem
                key={`profile_${k}`}
                header={headerMapping[k]}
                description={v}
              />
            ))}
          </React.Fragment>
        ) : (
          <Message error header="Fetch Error" content="Please refresh" />
        )}
      </FlexBox>
    </FlexBox>
  );
};
