import React from 'react';
import CSS from 'csstype';
import {
  Box,
  Table as BaseTable,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  ResponsiveValue,
} from '@chakra-ui/react';

import Pagination, { IPaginationProps } from '../Pagination';

interface IData {
  [key: string]: any;
}

interface IColumn {
  key: string;
  title: string;
  dataIndex?: string;
  render?(row: IData): any;
}

interface IProps {
  columns: IColumn[];
  rows: IData[];
  pagination?: IPaginationProps;
}

type OverflowX = ResponsiveValue<CSS.Property.OverflowX>;

const Table: React.FC<IProps> = ({ columns, rows, pagination }) => {
  const box = useBreakpointValue({
    base: {
      overflowX: 'scroll' as OverflowX,
    },
    lg: {
      overflowX: 'auto' as OverflowX,
    },
  });

  return (
    <>
      {(!pagination || (pagination && pagination.total > 0)) && (
        <Box w="100%" maxW="100vw" overflowX={box?.overflowX}>
          <BaseTable w="100%" maxW="100vw">
            <Thead>
              <Tr>
                {columns.map(column => (
                  <Th key={column.key}>{column.title}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((row, index) => (
                <Tr key={index}>
                  {columns.map(column => (
                    <Td key={column.key}>
                      {column.render
                        ? column.render(row)
                        : column.dataIndex
                        ? row[column.dataIndex]
                        : ''}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                {columns.map(column => (
                  <Th key={column.key}>{column.title}</Th>
                ))}
              </Tr>
            </Tfoot>
          </BaseTable>
          {pagination && <Pagination {...pagination} />}
        </Box>
      )}
    </>
  );
};

export default Table;
