import React, { Ref } from 'react';
import { Form as BaseForm } from '@unform/web';
import { FormProps, FormHandles } from '@unform/core';
import { Stack } from '@chakra-ui/react';

interface IProps extends Omit<FormProps, 'ref'> {
  ref?: Ref<FormHandles>;
}

const Form: React.FC<IProps> = React.forwardRef(
  ({ children, ...rest }, ref) => {
    return (
      <BaseForm ref={ref} {...rest}>
        <Stack spacing="40px">{children}</Stack>
      </BaseForm>
    );
  },
);

export default Form;
