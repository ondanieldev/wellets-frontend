import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBreakpointValue, Grid, GridItem } from '@chakra-ui/react';

import PageContainer from 'Components/Atoms/PageContainer';
import ContentContainer from 'Components/Atoms/ContentContainer';
import Header from 'Components/Organisms/Header';
import CreateTransactionForm from 'Components/Organisms/CreateTransactionForm';

import api from 'Services/api';
import CreateTransferForm from 'Components/Organisms/CreateTransferForm';

interface IParams {
  id: string;
}

const Wallet: React.FC = () => {
  const params = useParams<IParams>();

  const gridTemplate = useBreakpointValue({
    base: {
      columns: '1fr',
      rows: 'repeat(3, 1fr)',
    },
    md: {
      columns: 'repeat(2, 1fr)',
      rows: 'repeat(2, 1fr)',
    },
  });

  return (
    <PageContainer>
      <Header />

      <ContentContainer>
        <Grid
          templateColumns={gridTemplate?.columns}
          templateRows={gridTemplate?.rows}
          gap="25px"
          h="100%"
          w="100%"
        >
          <GridItem rowSpan={2} bg="tomato" />
          <GridItem>
            <CreateTransactionForm walletId={params.id} />
          </GridItem>
          <GridItem>
            <CreateTransferForm walletId={params.id} />
          </GridItem>
        </Grid>
      </ContentContainer>
    </PageContainer>
  );
};

export default Wallet;
