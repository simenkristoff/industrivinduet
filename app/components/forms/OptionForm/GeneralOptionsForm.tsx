import React from 'react';
import { Form, Input } from 'antd';
import { GeneralOptions } from '@/state/ducks/option/types';
import { InfoCircleOutlined } from '@ant-design/icons';
import { OptionMessage } from '@/constants';
import { phonePattern } from '@/constants/patterns';
import { EditorInput } from '@/components/adapters';

import { OptionFormInterface } from './interface';

interface IProps extends OptionFormInterface {
  data: {
    general: GeneralOptions | {};
  };
}

const GeneralOptionsForm: React.FC<IProps> = ({ form, data }: IProps) => {
  console.log(data);

  return (
    <Form
      form={form}
      name='general_options_form'
      initialValues={data.general}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item
        name='sitename'
        label={OptionMessage.GENERAL.SITENAME.LABEL}
        rules={[{ required: true, message: OptionMessage.GENERAL.SITENAME.REQUIRED }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='email'
        label={OptionMessage.GENERAL.EMAIL.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.EMAIL.INFO, icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true, message: OptionMessage.GENERAL.EMAIL.REQUIRED },
          { type: 'email', message: OptionMessage.GENERAL.EMAIL.TYPE },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='phone'
        label={OptionMessage.GENERAL.PHONE.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.PHONE.INFO, icon: <InfoCircleOutlined /> }}
        rules={[
          {
            pattern: phonePattern,
            message: OptionMessage.GENERAL.PHONE.TYPE,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='address'
        label={OptionMessage.GENERAL.ADDRESS.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.ADDRESS.INFO, icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: OptionMessage.GENERAL.ADDRESS.REQUIRED }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='organization'
        label={OptionMessage.GENERAL.ORGANIZATION.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.ORGANIZATION.INFO, icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true, message: OptionMessage.GENERAL.ORGANIZATION.REQUIRED },
          { type: 'number', message: OptionMessage.GENERAL.ORGANIZATION.TYPE },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='about'
        label={OptionMessage.GENERAL.ABOUT.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.ABOUT.INFO, icon: <InfoCircleOutlined /> }}
      >
        <EditorInput />
      </Form.Item>
    </Form>
  );
};

export default GeneralOptionsForm;
