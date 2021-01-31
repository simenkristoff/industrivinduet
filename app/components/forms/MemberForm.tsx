import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Select } from 'antd';
import { MemberEntity } from '@/state/ducks/member/types';
import { DataFormInterface, IApplicationState } from '@/types';
import { uniqueValue } from '@/utils/validation';
import { FormMessage } from '@/constants';

import MediaPicker from '../MediaPicker';

export const MemberForm: React.FC<DataFormInterface<MemberEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<MemberEntity>) => {
  const members = useSelector(({ member }: IApplicationState) => member.data);
  const roles = useSelector(({ role }: IApplicationState) => role.data);

  return (
    <Form
      form={form}
      name='member_form'
      initialValues={data}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' />
      </Form.Item>

      <MediaPicker />

      <Form.Item
        name={['name', 'first']}
        rules={[{ required: true, message: FormMessage.FIRST_NAME.REQUIRED }]}
      >
        <Input placeholder={FormMessage.FIRST_NAME.LABEL} />
      </Form.Item>

      <Form.Item
        name={['name', 'last']}
        rules={[{ required: true, message: FormMessage.LAST_NAME.REQUIRED }]}
      >
        <Input placeholder={FormMessage.LAST_NAME.LABEL} />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: FormMessage.EMAIL.REQUIRED },
          () => ({
            validator(_, value) {
              return uniqueValue(data, value, members, ['email'], true, FormMessage.EMAIL.UNIQUE);
            },
          }),
        ]}
      >
        <Input placeholder={FormMessage.EMAIL.LABEL} />
      </Form.Item>
      <Form.Item
        name={['role', '_id']}
        hasFeedback
        rules={[
          () => ({
            validator(_, value) {
              return uniqueValue(
                data,
                value,
                members,
                ['role._id'],
                false,
                FormMessage.ROLE.UNIQUE.SELECT,
              );
            },
          }),
        ]}
      >
        <Select placeholder={FormMessage.ROLE.LABEL.SELECT}>
          {roles.map((role) => (
            <Select.Option key={role._id} value={role._id}>
              {role.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
