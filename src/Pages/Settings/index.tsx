import React from 'react';
import {
  Stack,
  Heading,
  useBreakpointValue,
  StackDirection,
} from '@chakra-ui/react';

import PageContainer from 'Components/Atoms/PageContainer';
import ContentContainer from 'Components/Atoms/ContentContainer';
import UserSettingsForm from 'Components/Organisms/UserSettingsForm';
import Header from 'Components/Organisms/Header';

const Settings: React.FC = () => {
  const stack = useBreakpointValue({
    base: {
      direction: 'column' as StackDirection,
    },
    lg: {
      direction: 'row' as StackDirection,
    },
  });

  return (
    <PageContainer>
      <Header />

      <ContentContainer flexDirection="column" justifyContent="start">
        <Heading>Settings</Heading>

        <Stack
          mt="50px"
          direction={stack?.direction}
          spacing="25px"
          maxWidth="480px"
        >
          <UserSettingsForm />
        </Stack>
      </ContentContainer>
    </PageContainer>
  );
};

export default Settings;
