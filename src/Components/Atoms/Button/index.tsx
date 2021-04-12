import React from 'react';

import { Button as BaseButton, ButtonProps } from '@chakra-ui/react';

interface IProps extends ButtonProps {
  isPrimary?: boolean;
}

const Button: React.FC<IProps> = ({ isPrimary, ...rest }) => {
  return (
    <>
      {isPrimary ? (
        <BaseButton
          variant="outline"
          colorScheme="green"
          loadingText="Loading"
          {...rest}
        />
      ) : (
        <BaseButton
          variant="outline"
          colorScheme="red"
          loadingText="Loading"
          {...rest}
        />
      )}
    </>
  );
};

export default Button;
