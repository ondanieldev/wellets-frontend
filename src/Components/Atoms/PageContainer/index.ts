import { chakra, Flex } from '@chakra-ui/react';

const PageContainer = chakra(Flex, {
  baseStyle: {
    height: '100vh',
    flexDirection: 'column',
  },
});

export default PageContainer;
