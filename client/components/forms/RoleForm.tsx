import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Select } from 'antd';

import { DataFormInterface, IApplicationState, RoleEntity } from '@/types';
import { FormMessage, roleTypes } from '@/constants';
import { uniqueValue } from '@/utils';

export const RoleForm: React.FC<DataFormInterface<RoleEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<RoleEntity>) => {
  const roles = useSelector(({ role }: IApplicationState) => role.data);
  const groups = useSelector(({ group }: IApplicationState) => group.data);

  return (
    <Form form={form} name='role_form' initialValues={data} layout='vertical' requiredMark={false}>
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' readOnly />
      </Form.Item>

      <Form.Item
        name='name'
        rules={[
          { required: true, message: FormMessage.ROLE.REQUIRED.NAME },
          () => ({
            validator(_, value) {
              return uniqueValue(data, value, roles, ['name'], true, FormMessage.ROLE.UNIQUE.NAME);
            },
          }),
        ]}
      >
        <Input placeholder='Stillingsnavn' />
      </Form.Item>

      <Form.Item
        name='roleType'
        rules={[
          { required: true, message: FormMessage.ROLE_TYPE.REQUIRED },
          {
            type: 'enum',
            enum: roleTypes,
            message: FormMessage.ROLE_TYPE.TYPE,
          },
        ]}
      >
        <Select placeholder={FormMessage.ROLE_TYPE.LABEL} defaultValue='Medlem'>
          {roleTypes.map((roleType) => (
            <Select.Option key={roleType} value={roleType}>
              {roleType}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name={['group', '_id']}>
        <Select placeholder={FormMessage.GROUP.LABEL.SELECT}>
          {groups.map((group) => (
            <Select.Option key={group._id} value={group._id}>
              {group.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
