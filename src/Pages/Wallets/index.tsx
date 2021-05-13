import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  useToast,
  LinkBox,
  LinkOverlay,
  Flex,
  Stack,
  Heading,
  useBreakpointValue,
  StackDirection,
  Skeleton,
  IconButton,
} from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';

import Button from 'Components/Atoms/Button';
import Form from 'Components/Atoms/Form';
import Select, { IOption } from 'Components/Atoms/Select';
import PageContainer from 'Components/Atoms/PageContainer';
import ContentContainer from 'Components/Atoms/ContentContainer';
import Table from 'Components/Molecules/Table';
import CreateWalletForm from 'Components/Organisms/CreateWalletForm';
import Header from 'Components/Organisms/Header';

import { useErrors } from 'Hooks/errors';

import ICurrency from 'Entities/ICurrency';
import IWallet from 'Entities/IWallet';

import formatWalletValue from 'Helpers/formatWalletValue';
import getCurrency from 'Helpers/getCurrency';
import api from 'Services/api';

const Wallets: React.FC = () => {
  const { handleErrors } = useErrors();

  const toast = useToast();
  const stack = useBreakpointValue({
    base: {
      direction: 'column' as StackDirection,
    },
    lg: {
      direction: 'row' as StackDirection,
    },
  });

  const [currencies, setCurrencies] = useState([] as ICurrency[]);
  const [wallets, setWallets] = useState([] as IWallet[]);
  const [totalWallets, setTotalWallets] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingDeleteWallet, setLoadingDeleteWallet] = useState(false);
  const [loadingFetchWallets, setLoadingFetchWallets] = useState(false);
  const [loadingFetchCurrencies, setLoadingFetchCurrencies] = useState(false);
  const [loadingFetchTotalBalance, setLoadingFetchTotalBalance] = useState(
    false,
  );
  const [baseCurrencyId, setBaseCurrencyId] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);

  const limit = useMemo(() => 5, []);

  const currenciesOptions = useMemo<IOption[]>(
    () =>
      currencies.map(c => ({
        label: c.acronym,
        value: c.id,
      })),
    [currencies],
  );

  const fetchWallets = useCallback(async () => {
    try {
      setLoadingFetchWallets(true);
      const response = await api.get('/wallets', {
        params: {
          page,
          limit,
        },
      });
      setWallets(response.data.wallets);
      setTotalWallets(response.data.total);
    } catch (err) {
      handleErrors('Error when fetching wallets', err);
    } finally {
      setLoadingFetchWallets(false);
    }
  }, [page, limit, handleErrors]);

  const fetchCurrencies = useCallback(async () => {
    try {
      setLoadingFetchCurrencies(true);
      const response = await api.get('/currencies');
      setCurrencies(response.data);
    } catch (err) {
      handleErrors('Error when fetching currencies', err);
    } finally {
      setLoadingFetchCurrencies(false);
    }
  }, [handleErrors]);

  const handleDeleteWallet = useCallback(
    async (id: string) => {
      try {
        setLoadingDeleteWallet(true);
        await api.delete(`wallets/${id}`);
        toast({
          title: 'Wallet deleted',
          description: 'Your wallet has been successfully deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        fetchWallets();
      } catch (err) {
        handleErrors('Error when deleting wallet', err);
      } finally {
        setLoadingDeleteWallet(false);
      }
    },
    [toast, fetchWallets, handleErrors],
  );

  const fetchTotalBalance = useCallback(
    async (id: string) => {
      try {
        setLoadingFetchTotalBalance(true);
        const response = await api.get('/wallets/total-balance', {
          params: {
            base_currency_id: id,
          },
        });
        setTotalBalance(response.data.total_balance.toFixed(8));
        setLoadingFetchTotalBalance(false);
      } catch (err) {
        handleErrors('Error when calculating total balance', err);
      }
    },
    [handleErrors],
  );

  useEffect(() => {
    fetchWallets();
    fetchCurrencies();
  }, [fetchWallets, fetchCurrencies]);

  useEffect(() => {
    if (!baseCurrencyId) {
      if (!wallets[0]) return;
      const { currency_id } = wallets[0];
      setBaseCurrencyId(currency_id);
      fetchTotalBalance(currency_id);
      return;
    }
    fetchTotalBalance(baseCurrencyId);
  }, [fetchTotalBalance, baseCurrencyId, wallets]);

  return (
    <PageContainer>
      <Header />

      <ContentContainer flexDirection="column" justifyContent="start">
        <Heading>Wallets</Heading>

        <Skeleton
          isLoaded={!loadingFetchCurrencies && !loadingFetchTotalBalance}
        >
          <Flex alignItems="center">
            <Heading size="md" mr="10px">
              {`You have, approximately, ${totalBalance}`}
            </Heading>
            <Form onSubmit={() => fetchTotalBalance(baseCurrencyId)}>
              <Stack spacing="10px" direction="row">
                <Select
                  onChange={e => setBaseCurrencyId(e.target.value)}
                  name="base_currency_id"
                  options={currenciesOptions}
                  defaultValue={baseCurrencyId}
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

        <Stack mt="50px" w="100%" direction={stack?.direction} spacing="25px">
          <Skeleton isLoaded={!loadingFetchWallets && !loadingFetchCurrencies}>
            <Table
              rows={wallets}
              columns={[
                {
                  title: 'Alias',
                  key: 'alias',
                  dataIndex: 'alias',
                },
                {
                  title: 'Currency',
                  key: 'currency',
                  render(wallet: IWallet) {
                    return getCurrency(currencies, wallet.currency_id);
                  },
                },
                {
                  title: 'Balance',
                  key: 'balance',
                  render(wallet: IWallet) {
                    const { balance, currency_id } = wallet;
                    const currency = getCurrency(currencies, currency_id);
                    return formatWalletValue(balance, wallet, currency);
                  },
                },
                {
                  title: 'Actions',
                  key: 'actions',
                  render(wallet: IWallet) {
                    return (
                      <Flex>
                        <LinkBox>
                          <Button mr="10px">
                            <LinkOverlay href={`/wallets/${wallet.id}`}>
                              View
                            </LinkOverlay>
                          </Button>
                        </LinkBox>
                        <Button
                          type="button"
                          isLoading={loadingDeleteWallet}
                          onClick={() => handleDeleteWallet(wallet.id)}
                          confirmation={{
                            body:
                              'Are you sure you want to delete this wallet? All data attached to it will be lost.',
                            buttonText: 'I am sure',
                            colorSchema: 'red',
                          }}
                        >
                          Delete
                        </Button>
                      </Flex>
                    );
                  },
                },
              ]}
              pagination={{
                limit,
                currentPage: page,
                total: totalWallets,
                setPage,
              }}
            />
          </Skeleton>

          <CreateWalletForm onSuccess={fetchWallets} />
        </Stack>
      </ContentContainer>
    </PageContainer>
  );
};

export default Wallets;
