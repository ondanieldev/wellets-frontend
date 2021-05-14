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
import ICurrency from 'Entities/ICurrency';

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
  const [currencies, setCurrencies] = useState([] as ICurrency[]);
  const [updateTransactions, setUpdateTransactions] = useState(0);
  const [updateTransfers, setUpdateTransfers] = useState(0);
  const [loadingFetchWallet, setLoadingFetchWallet] = useState(false);
  const [loadingFetchCurrencies, setLoadingFetchCurrencies] = useState(false);

  const title = useMemo(() => {
    if (!wallet || !wallet.currency) {
      return '';
    }
    return `${wallet.alias} - ${wallet.currency.acronym} ${wallet.balance}`;
  }, [wallet]);

  const fetchWallet = useCallback(async () => {
    try {
      setLoadingFetchWallet(true);
      const { id } = params;
      const response = await api.get(`wallets/${id}`);
      setWallet(response.data);
      setLoadingFetchWallet(false);
    } catch (err) {
      handleErrors('Error when fetchin wallet data', err);
    }
  }, [params, handleErrors]);

  const fetchCurrencies = useCallback(async () => {
    try {
      setLoadingFetchCurrencies(true);
      const response = await api.get('/currencies');
      setCurrencies(response.data);
      setLoadingFetchCurrencies(false);
    } catch (err) {
      handleErrors('Error when fetching currencies', err);
    }
  }, [handleErrors]);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  return (
    <PageContainer>
      <Header />

      <Skeleton isLoaded={!loadingFetchWallet && !loadingFetchCurrencies}>
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
                    wallet={wallet}
                    currencies={currencies}
                    onSuccess={() => {
                      setUpdateTransactions(updateTransactions + 1);
                      fetchWallet();
                    }}
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
                    wallet={wallet}
                    currencies={currencies}
                    onSuccess={() => {
                      setUpdateTransfers(updateTransfers + 1);
                      fetchWallet();
                    }}
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
