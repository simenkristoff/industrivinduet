import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';

import { DataFormInterface, IApplicationState, PartnerEntity } from '@/types';
import { FormMessage } from '@/constants';
import { EditorInput } from '@/components/adapters';
import { MediaPicker } from '@/components/MediaPicker';
import { uniqueValue } from '@/utils';

/**
 * Dataform for entity Partner
 */
export const PartnerForm: React.FC<DataFormInterface<PartnerEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<PartnerEntity>) => {
  const partners = useSelector(({ partner }: IApplicationState) => partner.data);

  return (
    <Form
      form={form}
      name='partner_form'
      initialValues={data}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' readOnly />
      </Form.Item>

      <Form.Item name='image'>
        <MediaPicker />
      </Form.Item>

      <Form.Item
        name='name'
        label={FormMessage.COMPANY.LABEL.NAME}
        rules={[
          { required: true, message: FormMessage.COMPANY.REQUIRED.NAME },
          () => ({
            validator(_, value) {
              return uniqueValue(
                data,
                value,
                partners,
                ['name'],
                true,
                FormMessage.COMPANY.UNIQUE.NAME,
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='link'
        label={FormMessage.LINK.LABEL}
        rules={[{ required: true, message: FormMessage.LINK.REQUIRED }, { type: 'url' }]}
      >
        <Input type='url' />
      </Form.Item>

      <Form.Item
        name='description'
        label={FormMessage.DESCRIPTION.LABEL.DEFAULT}
        rules={[{ required: true, message: FormMessage.DESCRIPTION.REQUIRED.DEFAULT }]}
      >
        <EditorInput />
      </Form.Item>
    </Form>
  );
};
