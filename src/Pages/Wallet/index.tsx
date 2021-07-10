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
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';

import PageContainer from 'Components/Atoms/PageContainer';
import ContentContainer from 'Components/Atoms/ContentContainer';
import Header from 'Components/Organisms/Header';
import CreateTransactionForm from 'Components/Organisms/CreateTransactionForm';
import Form from 'Components/Atoms/Form';
import Select, { IOption } from 'Components/Atoms/Select';
import CreateTransferForm from 'Components/Organisms/CreateTransferForm';
import TransactionsHistory from 'Components/Organisms/TransactionsHistory';
import TransfersHistory from 'Components/Organisms/TransfersHistory';
import IWallet from 'Entities/IWallet';
import ICurrency from 'Entities/ICurrency';
import api from 'Services/api';
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
  const [currencies, setCurrencies] = useState([] as ICurrency[]);
  const [updateTransactions, setUpdateTransactions] = useState(0);
  const [updateTransfers, setUpdateTransfers] = useState(0);
  const [loadingFetchWallet, setLoadingFetchWallet] = useState(false);
  const [loadingFetchCurrencies, setLoadingFetchCurrencies] = useState(false);
  const [loadingFetchBalance, setLoadingFetchBalance] = useState(false);
  const [targetCurrencyId, setTargetCurrencyId] = useState('');
  const [balance, setBalance] = useState(0);

  const currenciesOptions = useMemo<IOption[]>(
    () =>
      currencies.map(c => ({
        label: c.acronym,
        value: c.id,
      })),
    [currencies],
  );

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

  const fetchBalance = useCallback(
    async (id: string) => {
      try {
        setLoadingFetchBalance(true);

        const currency = currencies.find(c => c.id === targetCurrencyId);
        if (!currency) return;

        const response = await api.get('/wallets/balance', {
          params: {
            wallet_id: wallet.id,
            target_currency: currency.acronym,
          },
        });
        setBalance(response.data.balance);
        setLoadingFetchBalance(false);
      } catch (err) {
        handleErrors('Error when calculating total balance', err);
      }
    },
    [handleErrors, targetCurrencyId, currencies, wallet],
  );

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  useEffect(() => {
    if (!targetCurrencyId) {
      if (!wallet) return;
      const { currency_id } = wallet;
      setTargetCurrencyId(currency_id);
      fetchBalance(currency_id);
      return;
    }
    fetchBalance(targetCurrencyId);
  }, [fetchBalance, targetCurrencyId, wallet]);

  return (
    <PageContainer>
      <Header />

      <Skeleton isLoaded={!loadingFetchWallet && !loadingFetchCurrencies}>
        <ContentContainer flexDirection="column" justifyContent="start">
          <Skeleton isLoaded={!loadingFetchCurrencies && !loadingFetchBalance}>
            <Flex alignItems="center">
              <Heading size="md" mr="10px">
                {`${wallet.alias} - ${balance}`}
              </Heading>
              <Form onSubmit={() => fetchBalance(targetCurrencyId)}>
                <Stack spacing="10px" direction="row">
                  <Select
                    onChange={e => setTargetCurrencyId(e.target.value)}
                    name="base_currency_id"
                    options={currenciesOptions}
                    defaultValue={targetCurrencyId}
                  />
                  <IconButton
                    type="submit"
                    colorScheme="green"
                    variant="outline"
                    aria-label="Refresh"
                    icon={<FiRefreshCw />}
                  />
                </Stack>
              </Form>
            </Flex>
          </Skeleton>

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
