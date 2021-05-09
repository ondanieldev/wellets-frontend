import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Table from 'Components/Molecules/Table';

import ITransfer from 'Entities/ITransfer';
import formatDate from 'Helpers/formatDate';
import api from 'Services/api';

interface IProps {
  walletId: string;
  updateTransfers: number;
}

const TransfersHistory: React.FC<IProps> = ({ walletId, updateTransfers }) => {
  const limit = useMemo(() => 25, []);

  const [transfers, setTransfers] = useState([] as ITransfer[]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await api.get('/transfers', {
        params: {
          limit,
          page,
          wallet_id: walletId,
        },
      });
      setTransfers(response.data.transfers);
      setTotal(response.data.total);
    } catch {}
  }, [limit, page, walletId, updateTransfers]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <Table
      rows={transfers}
      columns={[
        {
          title: 'Date',
          key: 'created_at',
          render(transfer: ITransfer) {
            return formatDate(transfer.created_at);
          },
        },
        {
          title: 'Value',
          key: 'value',
          render(transfer: ITransfer) {
            const currency = transfer.from_wallet.currency.acronym;
            const { value } = transfer;
            return `${Number(value).toFixed(2)} ${currency}`;
          },
        },
        {
          title: 'Fee',
          key: 'fee',
          render(transfer: ITransfer) {
            const currency = transfer.from_wallet.currency.acronym;
            const fee =
              Number(transfer.static_rate) +
              (Number(transfer.percentual_rate) / 100) * Number(transfer.value);
            return `${Number(fee).toFixed(2)} ${currency}`;
          },
        },
        {
          title: 'Filled',
          key: 'filled',
          render(transfer: ITransfer) {
            const currency = transfer.to_wallet.currency.acronym;
            const { filled } = transfer;
            return `${Number(filled).toFixed(2)} ${currency}`;
          },
        },
        {
          title: 'From',
          key: 'from',
          render(transfer: ITransfer) {
            const {
              alias,
              currency: { acronym },
            } = transfer.from_wallet;
            return `${alias} -  ${acronym}`;
          },
        },
        {
          title: 'To',
          key: 'to',
          render(transfer: ITransfer) {
            const {
              alias,
              currency: { acronym },
            } = transfer.to_wallet;
            return `${alias} -  ${acronym}`;
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

export default TransfersHistory;
