import React, {
  FC,
  SVGProps,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import os from 'os';

import { Container } from './styles';

interface IProps {
  name: string;
  color?: string;
}

const Icon: React.FC<IProps> = ({ name, color }) => {
  const iconRef = useRef<FC<SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(true);

  const fetchIcon = useCallback(async () => {
    try {
      setLoading(true);
      const plat = os.platform();

      if (plat !== 'win32') {
        iconRef.current = (
          await import(`../../../Assets/Icons/${name}.svg`)
        ).default;
      } else {
        iconRef.current = (
          await import(`..\\..\\..\\Assets\\Icons\\${name}.svg`)
        ).default;
      }
    } catch (err) {}
  }, [name]);

  useEffect(() => {
    fetchIcon();
  }, [name, fetchIcon]);

  if (!loading && iconRef.current) {
    const { current: ImportedIcon } = iconRef;

    return (
      <Container color={color}>
        <ImportedIcon />
      </Container>
    );
  }

  return <></>;
};

export default Icon;
