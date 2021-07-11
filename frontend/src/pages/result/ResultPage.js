import React from 'react';
import { Message } from 'semantic-ui-react';
import { InfoItem } from '../../core/components/molecules/InfoItem';
import { FlexBox } from '../../core/components/atoms/FlexBox';
import { Text } from '../../core/components/atoms/Text';
import { LoadingSpinner } from '../../core/components/molecules/LoadingSpinner';
import { useFetchGeneticResult } from '../../core/lib/hooks/useFetchGeneticResult';

export const ResultPage = () => {
  const [result, error, loading] = useFetchGeneticResult();

  return (
    <FlexBox $elevation padding="5%" flexDirection="column" backgroundColor="white">
      <Text fontSize={1.8} fontColor="black">
        Result
      </Text>
      <FlexBox flexDirection="column" margin="10px 0">
        {loading ? (
          <LoadingSpinner inverted={true} />
        ) : !error ? (
          <React.Fragment>
            {Object.entries(result.data).map(([k, v]) => (
              <InfoItem key={`result_${k}`} header={k} description={v} />
            ))}
          </React.Fragment>
        ) : (
          <Message error header="Fetch Error" content="Please refresh" />
        )}
      </FlexBox>
    </FlexBox>
  );
};
