import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, InputNumber, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { DataFormInterface, IApplicationState, ContentEntity } from '@/types';
import { FormMessage } from '@/constants';
import { EditorInput } from '@/components/adapters';
import { uniqueValue } from '@/utils';

export const ContentForm: React.FC<DataFormInterface<ContentEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<ContentEntity>) => {
  const contents = useSelector(({ content }: IApplicationState) => content.data);

  return (
    <Form
      form={form}
      name='content_form'
      initialValues={data}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
        <Input type='hidden' readOnly />
      </Form.Item>

      <Form.Item
        name='title'
        label={FormMessage.TITLE.LABEL}
        rules={[
          { required: true, message: FormMessage.TITLE.REQUIRED },
          () => ({
            validator(_, value) {
              return uniqueValue(data, value, contents, ['title'], true, FormMessage.TITLE.UNIQUE);
            },
          }),
        ]}
      >
        <Input placeholder={FormMessage.TITLE.LABEL} />
      </Form.Item>

      <Form.Item name='displayTitle' label='Vis tittel på siden' valuePropName='checked'>
        <Switch />
      </Form.Item>

      <Form.Item
        name='linkText'
        label={FormMessage.LINK_TEXT.LABEL}
        tooltip={{ title: FormMessage.LINK_TEXT.INFO, icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true, message: FormMessage.LINK_TEXT.REQUIRED },
          () => ({
            validator(_, value) {
              return uniqueValue(
                data,
                value,
                contents,
                ['linkText'],
                true,
                FormMessage.LINK_TEXT.UNIQUE,
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='priority'
        label={FormMessage.PRIORITY.LABEL}
        tooltip={{ title: FormMessage.PRIORITY.INFO, icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true, message: FormMessage.PRIORITY.REQUIRED },
          { type: 'integer' },
          () => ({
            validator(_, value) {
              return uniqueValue(
                data,
                value,
                contents,
                ['priority'],
                false,
                FormMessage.PRIORITY.UNIQUE,
              );
            },
          }),
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        name='content'
        label={FormMessage.DESCRIPTION.LABEL.CONTENT}
        tooltip={{ title: FormMessage.DESCRIPTION.INFO.CONTENT, icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: FormMessage.DESCRIPTION.REQUIRED.CONTENT }]}
      >
        <EditorInput />
      </Form.Item>
    </Form>
  );
};
