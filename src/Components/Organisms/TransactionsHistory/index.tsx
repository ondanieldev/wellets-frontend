import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Table from 'Components/Molecules/Table';

import ITransaction from 'Entities/ITransaction';
import formatDate from 'Helpers/formatDate';
import formatWalletValue from 'Helpers/formatWalletValue';
import api from 'Services/api';

interface IProps {
  walletId: string;
  updateTransactions: number;
}

const TransactionHistory: React.FC<IProps> = ({
  walletId,
  updateTransactions,
}) => {
  const limit = useMemo(() => 5, []);

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
  }, [limit, page, walletId, updateTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <Table
      rows={transactions}
      columns={[
        {
          title: 'Date',
          key: 'created_at',
          render(transaction: ITransaction) {
            return formatDate(transaction.created_at);
          },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Value',
          key: 'value',
          render(transaction: ITransaction) {
            const { value, wallet } = transaction;
            return formatWalletValue(value, wallet);
          },
        },
      ]}
      pagination={{
        limit,
        total,
        setPage,
        currentPage: page,
      }}
    />
  );
};

export default TransactionHistory;
