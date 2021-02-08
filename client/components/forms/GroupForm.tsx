import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import { GroupEntity } from '@/state/ducks/group/types';
import { DataFormInterface, IApplicationState } from '@/types';
import { uniqueValue } from '@/utils/validation';
import { FormMessage } from '@/constants';

export const GroupForm: React.FC<DataFormInterface<GroupEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<GroupEntity>) => {
  const groups = useSelector(({ group }: IApplicationState) => group.data);

  return (
    <Form form={form} name='group_form' initialValues={data} layout='vertical' requiredMark={false}>
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' />
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
