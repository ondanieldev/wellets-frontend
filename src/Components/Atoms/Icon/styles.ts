import styled from 'styled-components';

interface IProps {
  color?: string;
}

export const Container = styled.div<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ color }) => color && `svg, svg path { fill: ${color}; }`}
`;
