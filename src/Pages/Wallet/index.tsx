import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
} from '@chakra-ui/react';

import PageContainer from 'Components/Atoms/PageContainer';
import ContentContainer from 'Components/Atoms/ContentContainer';
import Header from 'Components/Organisms/Header';
import CreateTransactionForm from 'Components/Organisms/CreateTransactionForm';

import api from 'Services/api';
import CreateTransferForm from 'Components/Organisms/CreateTransferForm';
import TransactionHistory from 'Components/Organisms/TransactionHistory';

interface IParams {
  id: string;
}

const Wallet: React.FC = () => {
  const params = useParams<IParams>();

  return (
    <PageContainer>
      <Header />

      <ContentContainer>
        <Tabs w="100%">
          <TabList>
            <Tab>Transactions</Tab>
            <Tab>Transfers</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack direction="row" spacing="25px">
                <TransactionHistory walletId={params.id} />
                <CreateTransactionForm walletId={params.id} />
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack direction="row" spacing="25px">
                <TransactionHistory walletId={params.id} />
                <CreateTransferForm walletId={params.id} />
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ContentContainer>
    </PageContainer>
  );
};

export default Wallet;
