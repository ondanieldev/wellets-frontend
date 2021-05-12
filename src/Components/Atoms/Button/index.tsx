import React from 'react';

import {
  Button as BaseButton,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

interface IProps extends ButtonProps {
  isPrimary?: boolean;
  confirmation?: {
    body: string;
    buttonText: string;
    colorSchema: string;
  };
}

const Button: React.FC<IProps> = ({
  isPrimary,
  confirmation,
  onClick,
  ...rest
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <BaseButton
          variant="outline"
          colorScheme={isPrimary ? 'green' : 'white'}
          loadingText="Loading"
          onClick={confirmation ? () => {} : onClick}
          {...rest}
        />
      </PopoverTrigger>
      {confirmation && (
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              {confirmation.body}
              <BaseButton
                mt="10px"
                onClick={onClick}
                colorScheme={confirmation.colorSchema}
              >
                {confirmation.buttonText}
              </BaseButton>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      )}
    </Popover>
  );
};

export default Button;
