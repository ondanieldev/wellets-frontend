import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
  Heading,
  useBreakpointValue,
  StackDirection,
  Skeleton,
} from '@chakra-ui/react';

import PageContainer from 'Components/Atoms/PageContainer';
import ContentContainer from 'Components/Atoms/ContentContainer';
import Header from 'Components/Organisms/Header';
import CreateTransactionForm from 'Components/Organisms/CreateTransactionForm';

import api from 'Services/api';
import CreateTransferForm from 'Components/Organisms/CreateTransferForm';
import TransactionsHistory from 'Components/Organisms/TransactionsHistory';
import TransfersHistory from 'Components/Organisms/TransfersHistory';
import IWallet from 'Entities/IWallet';
import { useErrors } from 'Hooks/errors';

interface IParams {
  id: string;
}

const Wallet: React.FC = () => {
  const { handleErrors } = useErrors();

  const params = useParams<IParams>();
  const stack = useBreakpointValue({
    base: {
      direction: 'column' as StackDirection,
    },
    lg: {
      direction: 'row' as StackDirection,
    },
  });

  const [wallet, setWallet] = useState({} as IWallet);
  const [updateTransactions, setUpdateTransactions] = useState(0);
  const [updateTransfers, setUpdateTransfers] = useState(0);
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => {
    if (!wallet.alias || !wallet.currency) {
      return '';
    }
    return `${wallet.alias} - ${wallet.currency.acronym}`;
  }, [wallet]);

  const fetchWallet = useCallback(async () => {
    try {
      setLoading(true);
      const { id } = params;
      const response = await api.get(`wallets/${id}`);
      setWallet(response.data);
      setLoading(false);
    } catch (err) {
      handleErrors('Error when fetchin wallet data', err);
    }
  }, [params, handleErrors]);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return (
    <PageContainer>
      <Header />

      <Skeleton isLoaded={!loading}>
        <ContentContainer flexDirection="column" justifyContent="start">
          {title && <Heading>{title}</Heading>}

          <Tabs w="100%">
            <TabList>
              <Tab>Transactions</Tab>
              <Tab>Transfers</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Stack direction={stack?.direction} spacing="25px">
                  <TransactionsHistory
                    walletId={params.id}
                    updateTransactions={updateTransactions}
                  />
                  <CreateTransactionForm
                    walletId={params.id}
                    onSuccess={() =>
                      setUpdateTransactions(updateTransactions + 1)
                    }
                  />
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack direction={stack?.direction} spacing="25px">
                  <TransfersHistory
                    walletId={params.id}
                    updateTransfers={updateTransfers}
                  />
                  <CreateTransferForm
                    walletId={params.id}
                    onSuccess={() => setUpdateTransfers(updateTransfers + 1)}
                  />
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ContentContainer>
      </Skeleton>
    </PageContainer>
  );
};

export default Wallet;
