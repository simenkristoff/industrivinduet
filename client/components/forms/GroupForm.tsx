import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';

import { DataFormInterface, IApplicationState, GroupEntity } from '@/types';
import { FormMessage } from '@/constants';
import { uniqueValue } from '@/utils';

export const GroupForm: React.FC<DataFormInterface<GroupEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<GroupEntity>) => {
  const groups = useSelector(({ group }: IApplicationState) => group.data);

  return (
    <Form form={form} name='group_form' initialValues={data} layout='vertical' requiredMark={false}>
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' readOnly />
      </Form.Item>

      <Form.Item
        name='name'
        rules={[
          { required: true, message: FormMessage.GROUP.REQUIRED.NAME },
          () => ({
            validator(_, value) {
              return uniqueValue(
                data,
                value,
                groups,
                ['name'],
                true,
                FormMessage.GROUP.UNIQUE.NAME,
              );
            },
          }),
        ]}
      >
        <Input placeholder={FormMessage.GROUP.LABEL.NAME} />
      </Form.Item>
    </Form>
  );
};
