import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Routes from 'Routes';
import Providers from 'Hooks';
import theme from 'Styles/theme';

function App(): JSX.Element {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Providers>
          <Routes />
        </Providers>
      </ChakraProvider>
    </Router>
  );
}

export default App;
