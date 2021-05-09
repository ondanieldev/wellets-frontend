import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

import Pagination from 'Components/Molecules/Pagination';

import ITransaction from 'Entities/ITransaction';
import formatDate from 'Helpers/formatDate';
import api from 'Services/api';

interface IProps {
  walletId: string;
}

const TransactionHistory: React.FC<IProps> = ({ walletId }) => {
  const limit = useMemo(() => 25, []);

  const [transactions, setTransactions] = useState([] as ITransaction[]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await api.get('/transactions', {
        params: {
          limit,
          page,
          wallet_id: walletId,
        },
      });
      setTransactions(response.data.transactions);
      setTotal(response.data.total);
    } catch {}
  }, [limit, page, walletId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <>
      {total > 0 && (
        <Box w="100%">
          <Table variant="striped" colorScheme="green" mt="25px">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map(transaction => (
                <Tr key={transaction.id}>
                  <Td>{formatDate(transaction.created_at)}</Td>
                  <Td>{transaction.description}</Td>
                  <Td>{transaction.value}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Value</Th>
              </Tr>
            </Tfoot>
          </Table>
          <Pagination
            limit={limit}
            currentPage={page}
            total={total}
            setPage={setPage}
          />
        </Box>
      )}
    </>
  );
};

export default TransactionHistory;
