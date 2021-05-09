import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  useToast,
  LinkBox,
  LinkOverlay,
  Flex,
  Stack,
  Heading,
} from '@chakra-ui/react';

import Button from 'Components/Atoms/Button';
import PageContainer from 'Components/Atoms/PageContainer';
import ContentContainer from 'Components/Atoms/ContentContainer';
import Table from 'Components/Molecules/Table';
import CreateWalletForm from 'Components/Organisms/CreateWalletForm';
import Header from 'Components/Organisms/Header';

import { useErrors } from 'Hooks/errors';

import ICurrency from 'Entities/ICurrency';
import IWallet from 'Entities/IWallet';
import api from 'Services/api';

const Wallets: React.FC = () => {
  const toast = useToast();
  const { handleErrors } = useErrors();

  const [currencies, setCurrencies] = useState([] as ICurrency[]);
  const [wallets, setWallets] = useState([] as IWallet[]);
  const [totalWallets, setTotalWallets] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingDeleteWallet, setLoadingDeleteWallet] = useState(false);

  const limit = useMemo(() => 5, []);

  const fetchWallets = useCallback(async () => {
    try {
      const response = await api.get('/wallets', {
        params: {
          page,
          limit,
        },
      });
      setWallets(response.data.wallets);
      setTotalWallets(response.data.total);
    } catch (err) {
      handleErrors(err);
    }
  }, [page, limit, handleErrors]);

  const fetchCurrencies = useCallback(async () => {
    try {
      const response = await api.get('/currencies');
      setCurrencies(response.data);
    } catch {}
  }, []);

  const getCurrency = useCallback(
    (id: string): string => {
      const currency = currencies.find(c => c.id === id);
      if (!currency) {
        return id;
      }
      return currency.alias;
    },
    [currencies],
  );

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
        handleErrors(err);
      } finally {
        setLoadingDeleteWallet(false);
      }
    },
    [toast, fetchWallets, handleErrors],
  );

  useEffect(() => {
    fetchWallets();
    fetchCurrencies();
  }, [fetchWallets, fetchCurrencies]);

  return (
    <PageContainer>
      <Header />

      <ContentContainer flexDirection="column" justifyContent="start">
        <Heading>Wallets</Heading>

        <Stack mt="50px" w="100%" direction="row" spacing="25px">
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
                  return getCurrency(wallet.currency_id);
                },
              },
              {
                title: 'Balance',
                key: 'balance',
                dataIndex: 'balance',
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

          <CreateWalletForm onSuccess={fetchWallets} />
        </Stack>
      </ContentContainer>
    </PageContainer>
  );
};

export default Wallets;
