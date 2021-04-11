import React from 'react';
import { Grid, useBreakpointValue } from '@chakra-ui/react';

import PageContainer from 'Components/Atoms/PageContainer';
import ContentContainer from 'Components/Atoms/ContentContainer';
import MenuItem from 'Components/Molecules/MenuItem';
import Header from 'Components/Organisms/Header';

const Menu: React.FC = () => {
  const gridTemplate = useBreakpointValue({
    base: {
      columns: '1fr',
      rows: 'repeat(3, 1fr)',
    },
    md: {
      columns: 'repeat(3, 1fr)',
      rows: '1fr',
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
        >
          <MenuItem
            icon="transaction"
            items={[
              'Add money to your wallets',
              'Remove money from your wallets',
              'View your transaction history',
            ]}
            palette={['#4299E1', '#63B3ED', '#3182CE', '#4299E1']}
            title="Transactions"
            link="/transactions"
          />
          <MenuItem
            icon="wallet"
            items={['Create a new wallet', 'Manage your wallets']}
            palette={['#48BB78', '#68D391', '#38A169', '#48BB78']}
            title="Wallets"
            link="/wallets"
          />
          <MenuItem
            icon="transfer"
            items={[
              'Transfer money between two wallets',
              'View your transfer history',
            ]}
            palette={['#9F7AEA', '#B794F4', '#805AD5', '#9F7AEA']}
            title="Transfers"
            link="/transfers"
          />
        </Grid>
      </ContentContainer>
    </PageContainer>
  );
};

export default Menu;
