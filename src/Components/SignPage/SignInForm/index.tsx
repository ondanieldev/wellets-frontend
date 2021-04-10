import React, { useRef, useState, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Stack, Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';

import Input from 'Components/Input';

import signInSchema from 'Schemas/signIn';
import handleErrors from 'Helpers/handleErrors';
import api from 'Services/api';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const signInFormRef = useRef<FormHandles>(null);

  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const handleSignIn = useCallback(
    async (data: ISignInFormData) => {
      try {
        if (loadingSignIn) return;
        setLoadingSignIn(true);
        signInFormRef.current?.setErrors({});
        await signInSchema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users/signin', data);
        toast.success('You are in!');
      } catch (err) {
        handleErrors(err, signInFormRef);
      } finally {
        setLoadingSignIn(false);
      }
    },
    [loadingSignIn, signInFormRef],
  );

  return (
    <Form ref={signInFormRef} onSubmit={handleSignIn}>
      <Stack spacing="40px">
        <Input
          name="email"
          type="email"
          placeholder="Enter your e-mail"
          helper="We'll never share your email."
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <Button
          type="submit"
          variant="outline"
          colorScheme="green"
          loadingText="Loading"
          isLoading={loadingSignIn}
        >
          Sign In
        </Button>
      </Stack>
    </Form>
  );
};

export default SignInForm;
