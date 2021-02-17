import React from 'react';
import _ from 'lodash';
import { Form, Input, Radio, Select } from 'antd';
import { useSelector } from 'react-redux';

import { DataFormInterface, IApplicationState, UserEntity, MemberEntity } from '@/types';
import { FormMessage, userTypes } from '@/constants';

/**
 * Dataform for entity User
 */
export const UserForm: React.FC<DataFormInterface<UserEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<UserEntity>) => {
  const users: string[] = useSelector(({ user }: IApplicationState) => _.map(user.data, 'email'));
  const members: MemberEntity[] = useSelector(({ member }: IApplicationState) =>
    _.filter(member.data, (_m) => {
      return users.every((user) => {
        return user !== _m.email;
      });
    }),
  );

  return (
    <Form form={form} name='user_form' initialValues={data} layout='vertical' requiredMark={false}>
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' readOnly />
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

      <Form.Item
        name={['email']}
        hasFeedback
        rules={[{ required: true, message: FormMessage.MEMBER.REQUIRED }]}
      >
        <Select placeholder={FormMessage.MEMBER.LABEL.USER} disabled={editMode}>
          {members.map((member) => (
            <Select.Option key={member._id} value={member.email}>
              {`${member.name.first} ${member.name.last}`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
