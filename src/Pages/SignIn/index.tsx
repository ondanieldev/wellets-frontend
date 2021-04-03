import React, { useRef, useState, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import {
  Box,
  Flex,
  Stack,
  Center,
  Button,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';

import Input from 'Components/Input';
import Sponsors from 'Components/Sponsors';
import api from 'Services/api';
import signInSchema from 'Schemas/signIn';
import handleErrors from 'Helpers/handleErrors';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // Custom hooks
  const showSponsors = useBreakpointValue({ base: false, md: true });

  // Refs
  const signInFormRef = useRef<FormHandles>(null);

  // States
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  // Callbacks
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
    <Box h="100vh" p="25px">
      <Flex h="100%">
        {showSponsors && <Sponsors />}
        <Box
          w="100%"
          bg="gray.700"
          borderEndRadius="5px"
          borderStartRadius={!showSponsors ? '5px' : ''}
        >
          <Center h="100%">
            <Stack spacing="40px" w="100%" maxW="400px" p="20px">
              <Heading color="green.300" textAlign="center">
                Sign In
              </Heading>
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
            </Stack>
          </Center>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignIn;
