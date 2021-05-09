import React, { useState, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import Radio from 'Components/Atoms/Radio';
import Button from 'Components/Atoms/Button';

import ICreateTransactionDTO from 'DTOs/ICreateTransactionDTO';

import api from 'Services/api';
import createTransaction from 'Schemas/createTransaction';
import handleErrors from 'Helpers/handleErrors';

interface ICreateTransaction extends ICreateTransactionDTO {
  type?: 'credit' | 'debit';
}

interface IProps {
  walletId: string;
  onSuccess?: () => void;
}

const CreateTransactionForm: React.FC<IProps> = ({ walletId, onSuccess }) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const handleCreateTransaction = useCallback(
    async (data: ICreateTransaction) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        await createTransaction.validate(data, {
          abortEarly: false,
        });
        delete data.type;
        data.wallet_id = walletId;

        await api.post('/transactions', data);

        formRef.current?.reset();
        toast.success('Transaction successfully created');

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

  return (
    <Form
      title="Create Transaction"
      ref={formRef}
      onSubmit={handleCreateTransaction}
    >
      <Input name="value" type="number" placeholder="Value" />
      <Input name="description" type="text" placeholder="Description" />
      <Radio
        name="type"
        options={[
          { id: 'credit', value: 'credit', label: 'Credit' },
          { id: 'debit', value: 'debit', label: 'Debit' },
        ]}
      />
      <Button isLoading={loading} type="submit" isPrimary>
        Create
      </Button>
    </Form>
  );
};

export default CreateTransactionForm;
