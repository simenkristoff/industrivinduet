import React from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { RegisterCredentials } from '@/state/ducks/auth/types';
import { FormMessage, userTypes } from '@/constants';

export interface IProps {
  register: (credentials: RegisterCredentials) => void;
}

export const RegisterForm: React.FC<IProps> = ({ register }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={{ permissions: userTypes.USER }}
      name='register_form'
      onFinish={register}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item name='email' rules={[{ required: true, message: FormMessage.EMAIL.REQUIRED }]}>
        <Input placeholder={FormMessage.EMAIL.LABEL} />
      </Form.Item>

      <Form.Item
        name='password'
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

      <Form.Item className='text-center'>
        <Button type='primary' size='large' htmlType='submit'>
          Registrer bruker
        </Button>
      </Form.Item>
    </Form>
  );
};
