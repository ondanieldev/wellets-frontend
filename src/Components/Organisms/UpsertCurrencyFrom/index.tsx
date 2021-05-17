import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Box, Stack, useToast } from '@chakra-ui/react';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import Button from 'Components/Atoms/Button';

import { useErrors } from 'Hooks/errors';

import ICurrency from 'Entities/ICurrency';
import IUpsertCurrencyDTO from 'DTOs/IUpsertCurrencyDTO';

import api from 'Services/api';
import upsertCurrency from 'Schemas/upsertCurrency';

interface IProps {
  currentCurrency: ICurrency;
  onSuccess?: () => void;
  onCancelUpdate?: () => void;
}

const UpsertCurrencyForm: React.FC<IProps> = ({
  onSuccess,
  currentCurrency,
  onCancelUpdate,
}) => {
  const toast = useToast();
  const { handleErrors } = useErrors();

  const formRef = useRef<FormHandles>(null);

  const [loadingUpsertCurrency, setLoadingUpsertCurrency] = useState(false);

  const handleUpsertCurrency = useCallback(
    async (data: IUpsertCurrencyDTO) => {
      const isUpdate = !!currentCurrency.id;

      try {
        setLoadingUpsertCurrency(true);
        formRef.current?.setErrors({});

        await upsertCurrency.validate(data, {
          abortEarly: false,
        });

        data.dollar_rate = 1 / data.dollar_rate;

        if (isUpdate) {
          await api.put(`/currencies/custom/${currentCurrency.id}`, data);
        } else {
          await api.post('/currencies/custom', data);
        }

        toast({
          title: isUpdate
            ? 'Your currency was successfully updated!'
            : 'A new currency has been successfully created!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });

        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        handleErrors(
          isUpdate
            ? 'Error when creating a new currency'
            : 'Error when updating your currency',
          err,
          formRef,
        );
      } finally {
        setLoadingUpsertCurrency(false);
      }
    },
    [formRef, onSuccess, handleErrors, toast, currentCurrency],
  );

  useEffect(() => {
    if (currentCurrency.id) {
      formRef.current?.setData(currentCurrency);
      return;
    }
    formRef.current?.reset();
  }, [currentCurrency]);

  return (
    <Box w="100%">
      <Form ref={formRef} onSubmit={handleUpsertCurrency}>
        <Input name="acronym" type="text" placeholder="3 or 4 letter acronym" />
        <Input name="alias" type="text" placeholder="Alias" />
        <Input
          name="dollar_rate"
          type="number"
          placeholder="Dollar rate"
          helper="1 unity of your currency equals ? USD"
        />
        <Input
          name="format"
          type="text"
          placeholder="Display format (like $ 00.00)"
        />
        <Stack spacing="10px">
          <Button
            isLoading={loadingUpsertCurrency}
            type="submit"
            colorSchema="blue"
            isPrimary
          >
            {currentCurrency.id ? 'Update' : 'Create'}
          </Button>
          {currentCurrency.id && (
            <Button type="button" onClick={onCancelUpdate} isDanger>
              Cancel
            </Button>
          )}
        </Stack>
      </Form>
    </Box>
  );
};

export default UpsertCurrencyForm;
