import React from 'react';
import { Form, Input, Button } from 'antd';

import { ResetPasswordCredentials } from '@/types';
import { FormMessage } from '@/constants';

export interface IProps {
  reset: (credentials: ResetPasswordCredentials) => void;
  token: string;
}

export const ResetPasswordForm: React.FC<IProps> = ({ reset, token }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name='reset_password_form'
      initialValues={{ token }}
      onFinish={reset}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name='token' hidden rules={[{ required: true }]}>
        <Input type='hidden' readOnly />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: FormMessage.PASSWORD.REQUIRED.DEFAULT }]}
      >
        <Input.Password placeholder={FormMessage.PASSWORD.LABEL.DEFAULT} />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: FormMessage.PASSWORD.REQUIRED.REPEAT },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(FormMessage.PASSWORD.ERROR.REPEAT);
            },
          }),
        ]}
      >
        <Input.Password placeholder={FormMessage.PASSWORD.LABEL.REPEAT} />
      </Form.Item>

      <Form.Item className='text-center'>
        <Button type='primary' size='large' htmlType='submit'>
          Tilbakestill passord
        </Button>
      </Form.Item>
    </Form>
  );
};
