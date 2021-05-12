import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import {
  Select as BaseSelect,
  SelectProps,
  FormControl,
  InputGroup,
  FormLabel,
  InputRightElement,
  FormHelperText,
} from '@chakra-ui/react';

import InputError from '../InputError';

export interface IOption {
  value: string | number;
  label: string;
}

export interface IProps extends SelectProps {
  name: string;
  label?: string;
  helper?: string;
  options: IOption[];
}

const Select: React.FC<IProps> = ({
  name,
  label,
  helper,
  options,
  ...rest
}) => {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <FormControl id={name}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <BaseSelect ref={selectRef} defaultValue={defaultValue} {...rest}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </BaseSelect>
        {error && (
          <InputRightElement width="4.5rem">
            <InputError error={error} />
          </InputRightElement>
        )}
      </InputGroup>
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
