import React, { useRef, useState, useCallback } from 'react';
import { FormHandles } from '@unform/core';

import Form from 'Components/Atoms/Form';
import Input from 'Components/Atoms/Input';
import Button from 'Components/Atoms/Button';

import ISignInDTO from 'DTOs/ISignInDTO';

import { useAuth } from 'Hooks/auth';

import signInSchema from 'Schemas/signIn';
import handleErrors from 'Helpers/handleErrors';

const SignInForm: React.FC = () => {
  const { signIn } = useAuth();

  const signInFormRef = useRef<FormHandles>(null);

  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const handleSignIn = useCallback(
    async (data: ISignInDTO) => {
      try {
        if (loadingSignIn) return;
        setLoadingSignIn(true);
        signInFormRef.current?.setErrors({});
        await signInSchema.validate(data, {
          abortEarly: false,
        });
        await signIn(data);
      } catch (err) {
        handleErrors(err, signInFormRef);
      } finally {
        setLoadingSignIn(false);
      }
    },
    [loadingSignIn, signInFormRef, signIn],
  );

  return (
    <Form ref={signInFormRef} onSubmit={handleSignIn}>
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
      <Button type="submit" isLoading={loadingSignIn} isPrimary>
        Sign In
      </Button>
    </Form>
  );
};

export default SignInForm;
