import React from 'react';
import { PageHeader, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { DataHeaderInterface } from '@/types';

export const DataHeader: React.FC<DataHeaderInterface> = ({
  hasPermission,
  name,
  toggle,
}: DataHeaderInterface) => {
  return (
    <PageHeader
      ghost={false}
      title={name.plural}
      extra={[
        <Button
          key='1'
          type='primary'
          size='large'
          className='hide-sm'
          icon={<PlusOutlined />}
          onClick={toggle}
          disabled={!hasPermission}
        >
          Legg til {name.singular}
        </Button>,
      ]}
    />
  );
};
