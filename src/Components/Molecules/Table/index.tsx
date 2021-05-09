import React from 'react';
import {
  Box,
  Table as BaseTable,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
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

const Table: React.FC<IProps> = ({ columns, rows, pagination }) => {
  return (
    <>
      {(!pagination || (pagination && pagination.total > 0)) && (
        <Box w="100%">
          <BaseTable variant="striped" colorScheme="green">
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
                    <Td>
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
