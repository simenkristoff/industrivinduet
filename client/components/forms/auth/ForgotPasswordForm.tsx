import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { ForgotPasswordCredentials } from '@/types';
import { FormMessage } from '@/constants';

export interface IProps {
  forgot: (credentials: ForgotPasswordCredentials) => void;
}

/**
 * Forgot password form. Dispatches a forgot password request
 */
export const ForgotPasswordForm: React.FC<IProps> = ({ forgot }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name='forgot_password_form'
      onFinish={forgot}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name='email' rules={[{ required: true, message: FormMessage.EMAIL.REQUIRED }]}>
        <Input prefix={<UserOutlined />} placeholder={FormMessage.EMAIL.LABEL} />
      </Form.Item>

      <Form.Item className='text-center'>
        <Button type='primary' size='large' htmlType='submit'>
          Tilbakestill passord
        </Button>
      </Form.Item>
    </Form>
  );
};
