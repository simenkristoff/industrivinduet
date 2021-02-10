import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginCredentials } from '@/types';

import { FormMessage } from '@/constants';

export interface IProps {
  login: (credentials: LoginCredentials) => void;
}

export const LoginForm: React.FC<IProps> = ({ login }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name='login_form'
      initialValues={{ remember: true }}
      onFinish={login}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name='email' rules={[{ required: true, message: FormMessage.EMAIL.REQUIRED }]}>
        <Input prefix={<UserOutlined />} placeholder={FormMessage.EMAIL.LABEL} />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: FormMessage.PASSWORD.REQUIRED.DEFAULT }]}
      >
        <Input
          prefix={<LockOutlined />}
          type='password'
          placeholder={FormMessage.PASSWORD.LABEL.DEFAULT}
        />
      </Form.Item>

      <Form.Item name='remember' valuePropName='checked'>
        <Checkbox>Husk meg</Checkbox>
      </Form.Item>

      <Form.Item className='text-center'>
        <Button type='primary' size='large' htmlType='submit'>
          Logg inn
        </Button>
      </Form.Item>
    </Form>
  );
};
