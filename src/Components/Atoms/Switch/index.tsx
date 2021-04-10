import React, { useCallback, useState } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { LeftButton, RightButton } from './styles';

type IButton = 'left' | 'right';

interface ISwitchProps extends Omit<BoxProps, 'onChange'> {
  leftText: string;
  rightText: string;
  defaultActive?: IButton;
  onChange: (_active: IButton) => void;
}

const Switch: React.FC<ISwitchProps> = ({
  leftText,
  rightText,
  defaultActive,
  onChange,
  ...rest
}) => {
  const [active, setActive] = useState(defaultActive || 'left');

  const handleClick = useCallback(
    (newActive: IButton) => {
      setActive(newActive);
      if (onChange) {
        onChange(newActive);
      }
    },
    [onChange],
  );

  return (
    <Box {...rest}>
      <LeftButton
        active={active === 'left'}
        onClick={() => handleClick('left')}
      >
        {leftText}
      </LeftButton>
      <RightButton
        active={active === 'right'}
        onClick={() => handleClick('right')}
      >
        {rightText}
      </RightButton>
    </Box>
  );
};

export default Switch;
