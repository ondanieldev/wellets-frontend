import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import {
  Input as BaseInput,
  FormControl,
  FormHelperText,
  InputProps,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

import InputError from '../InputError';

interface IProps extends InputProps {
  name: string;
  label?: string;
  helper?: string;
}

const Input: React.FC<IProps> = ({ name, label, helper, type, ...rest }) => {
  // Custom hooks
  const { fieldName, error, registerField, defaultValue } = useField(name);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // States
  const [showPassword, setShowPassword] = useState(false);

  // Memos
  const inputType = useMemo(() => {
    if (type === 'password' && showPassword) return 'text';
    if (type === 'password' && !showPassword) return 'password';
    return type;
  }, [type, showPassword]);

  // Effects
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName, inputRef]);

  return (
    <FormControl id={name}>
      <InputGroup>
        {label && <FormLabel>{label}</FormLabel>}
        <BaseInput
          variant="flushed"
          name={name}
          ref={inputRef}
          type={inputType}
          defaultValue={defaultValue}
          {...rest}
        />
        {type === 'password' && error && (
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              mr="5px"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
            <InputError error={error} />
          </InputRightElement>
        )}
        {type === 'password' && !error && (
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        )}
        {type !== 'password' && error && (
          <InputRightElement width="4.5rem">
            <InputError error={error} />
          </InputRightElement>
        )}
      </InputGroup>

      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
