import { Entity } from '@/state/interface';
import Table from 'antd/lib/table';
import React from 'react';

import { DataListInterface } from './interface';

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