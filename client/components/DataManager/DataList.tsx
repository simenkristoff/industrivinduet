import Table from 'antd/lib/table';
import React from 'react';

import { Entity, DataListInterface } from '@/types';

/**
 * Displays all the entities of @type {T extends Entity} fetched
 * from database in a table.
 */
export const DataList = <T extends Entity>({
  state,
  columns,
  expandable,
}: DataListInterface<T>): JSX.Element => {
  return (
    <Table
      showSorterTooltip={false}
      pagination={{ pageSize: 10, position: ['bottomCenter'] }}
      expandable={expandable}
      dataSource={state.data}
      columns={columns}
      rowKey={(record) => record._id}
    />
  );
};
