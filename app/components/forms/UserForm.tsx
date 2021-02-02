import React from 'react';
import { Form, Input, Radio } from 'antd';
import { UserEntity } from '@/state/ducks/user/types';
import { DataFormInterface } from '@/types';
import { FormMessage, userTypes } from '@/constants';

export const UserForm: React.FC<DataFormInterface<UserEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<UserEntity>) => {
  return (
    <Form form={form} name='user_form' initialValues={data} layout='vertical' requiredMark={false}>
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' />
      </Form.Item>

      <Form.Item
        name='permissions'
        label={FormMessage.PERMISSIONS.LABEL}
        rules={[{ required: true, message: FormMessage.PERMISSIONS.REQUIRED }]}
      >
        <Radio.Group>
          {Object.entries(userTypes).map(([key, type]) => (
            <Radio value={key} key={key}>
              {type}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
