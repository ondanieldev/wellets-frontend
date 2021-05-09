import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import Select, { IOption } from 'Components/Atoms/Select';
import Button from 'Components/Atoms/Button';

import ICreateTransferDTO from 'DTOs/ICreateTransferDTO';

import api from 'Services/api';
import createTransfer from 'Schemas/createTransfer';
import handleErrors from 'Helpers/handleErrors';
import IWallet from 'Entities/IWallet';

interface IProps {
  walletId: string;
  onSuccess?: () => void;
}

const CreateTransferForm: React.FC<IProps> = ({ walletId, onSuccess }) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useState([] as IWallet[]);

  const walletsOptions = useMemo<IOption[]>(
    () =>
      wallets.map(wallet => ({
        value: wallet.id,
        label: wallet.alias,
      })),
    [wallets],
  );

  const fetchWallets = useCallback(async () => {
    try {
      const newWallets = [] as IWallet[];
      const limit = 25;
      let page = 1;
      let total = -1;

      while (newWallets.length !== total) {
        const response = await api.get('/wallets', {
          params: {
            limit,
            page,
          },
        });
        newWallets.push(...response.data.wallets);
        total = response.data.total;
        page++;
      }

      setWallets(newWallets.filter(wallet => wallet.id !== walletId));
    } catch {}
  }, [walletId]);

  const handleCreateTransfer = useCallback(
    async (data: ICreateTransferDTO) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        if (!data.static_rate) delete data.static_rate;
        if (!data.percentual_rate) delete data.percentual_rate;
        await createTransfer.validate(data, {
          abortEarly: false,
        });
        data.from_wallet_id = walletId;

        await api.post('/transfers', data);

        formRef.current?.reset();
        toast.success('Transfer successfully created');

        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        handleErrors(err, formRef);
      } finally {
        setLoading(false);
      }
    },
    [formRef, onSuccess, walletId],
  );

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  return (
    <Form title="Create transfer" ref={formRef} onSubmit={handleCreateTransfer}>
      <Select
        label="Receiving wallet"
        name="to_wallet_id"
        options={walletsOptions}
      />
      <Input name="value" type="number" placeholder="Value" />
      <Input name="static_rate" type="number" placeholder="Static rate" />
      <Input
        name="percentual_rate"
        type="number"
        placeholder="Percentual rate"
      />
      <Button isLoading={loading} type="submit" isPrimary>
        Create
      </Button>
    </Form>
  );
};

export default CreateTransferForm;
