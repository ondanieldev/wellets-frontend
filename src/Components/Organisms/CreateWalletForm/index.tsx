import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { Box } from '@chakra-ui/react';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import Select, { IOption } from 'Components/Atoms/Select';
import Button from 'Components/Atoms/Button';

import ICurrency from 'Entities/ICurrency';
import ICreateWalletDTO from 'DTOs/ICreateWalletDTO';

import api from 'Services/api';
import createWallet from 'Schemas/createWallet';
import handleErrors from 'Helpers/handleErrors';

interface IProps {
  onSuccess?: () => void;
}

const CreateWalletForm: React.FC<IProps> = ({ onSuccess }) => {
  const formRef = useRef<FormHandles>(null);

  const [currencies, setCurrencies] = useState([] as ICurrency[]);
  const [loading, setLoading] = useState(false);

  const currenciesOptions = useMemo(
    () =>
      currencies
        .map(currency => {
          return {
            value: currency.id,
            label: `${currency.acronym} - ${currency.alias}`,
          } as IOption;
        })
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    [currencies],
  );

  const handleCreateWallet = useCallback(
    async (data: ICreateWalletDTO) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        await createWallet.validate(data, {
          abortEarly: false,
        });

        await api.post('/wallets', data);

        formRef.current?.reset();
        toast.success('Wallet successfully created');

        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        handleErrors(err, formRef);
      } finally {
        setLoading(false);
      }
    },
    [formRef, onSuccess],
  );

  useEffect(() => {
    api
      .get('/currencies')
      .then(response => {
        setCurrencies(response.data);
      })
      .catch(err => {
        handleErrors(err);
      });
  }, []);

  return (
    <Box w="100%">
      <Form ref={formRef} onSubmit={handleCreateWallet}>
        <Select
          name="currency_id"
          placeholder="Select a currency"
          options={currenciesOptions}
        />
        <Input
          name="alias"
          type="text"
          placeholder="Give a cool nickname to your wallet"
        />
        <Input
          name="balance"
          type="number"
          placeholder="Type an optional initial balance"
        />
        <Button isLoading={loading} type="submit" isPrimary>
          Create
        </Button>
      </Form>
    </Box>
  );
};

export default CreateWalletForm;
