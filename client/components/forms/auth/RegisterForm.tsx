import React from 'react';
import { Form, Input, Button } from 'antd';

import { RegisterCredentials, UserEntity } from '@/types';
import { FormMessage } from '@/constants';

export interface IProps {
  user: UserEntity | {};
  register: (credentials: RegisterCredentials) => void;
}

/**
 * Register form. Registers a new user if register token is valid
 */
export const RegisterForm: React.FC<IProps> = ({ register, user }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={user}
      name='register_form'
      onFinish={register}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name={['registerToken']} hidden rules={[{ required: true }]}>
        <Input type='hidden' readOnly />
      </Form.Item>

      <Form.Item name={['permissions']} hidden rules={[{ required: true }]}>
        <Input type='hidden' readOnly />
      </Form.Item>

      <Form.Item name={['email']} rules={[{ required: true, message: FormMessage.EMAIL.REQUIRED }]}>
        <Input placeholder={FormMessage.EMAIL.LABEL} readOnly={true} />
      </Form.Item>

      <Form.Item
        name={['password']}
        rules={[{ required: true, message: FormMessage.PASSWORD.REQUIRED.DEFAULT }]}
      >
        <Input.Password placeholder={FormMessage.PASSWORD.LABEL.DEFAULT} />
      </Form.Item>

      <Form.Item
        name='confirm'
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
          Registrer bruker
        </Button>
      </Form.Item>
    </Form>
  );
};
