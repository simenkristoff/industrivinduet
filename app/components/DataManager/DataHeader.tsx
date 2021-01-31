import React from 'react';
import { PageHeader, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { DataHeaderInterface } from './interface';

export const DataHeader: React.FC<DataHeaderInterface> = ({
  name,
  toggle,
}: DataHeaderInterface) => {
  return (
    <PageHeader
      ghost={false}
      title={name.plural}
      extra={[
        <Button key='1' type='primary' size='large' icon={<PlusOutlined />} onClick={toggle}>
          Legg til {name.singular}
        </Button>,
      ]}
    />
  );
};
