import React from 'react';
import { Form, Input, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { OptionFormInterface } from '@/types';
import { OptionMessage, orgPattern, phonePattern } from '@/constants';
import { EditorInput } from '@/components/adapters';

/**
 * Optionform for General options
 */
const GeneralOptionsForm: React.FC<OptionFormInterface> = ({ form, data }: OptionFormInterface) => {
  return (
    <Form
      form={form}
      name='general_options_form'
      initialValues={data}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item
        name={['general', 'sitename']}
        label={OptionMessage.GENERAL.SITENAME.LABEL}
        rules={[{ required: true, message: OptionMessage.GENERAL.SITENAME.REQUIRED }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['general', 'email']}
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
        name={['general', 'phone']}
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
        name={['general', 'address']}
        label={OptionMessage.GENERAL.ADDRESS.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.ADDRESS.INFO, icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: OptionMessage.GENERAL.ADDRESS.REQUIRED }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['general', 'showMaps']}
        label={OptionMessage.GENERAL.MAPS.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.MAPS.INFO, icon: <InfoCircleOutlined /> }}
        valuePropName='checked'
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name={['general', 'organization']}
        label={OptionMessage.GENERAL.ORGANIZATION.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.ORGANIZATION.INFO, icon: <InfoCircleOutlined /> }}
        rules={[
          { required: true, message: OptionMessage.GENERAL.ORGANIZATION.REQUIRED },
          {
            pattern: orgPattern,
            message: OptionMessage.GENERAL.ORGANIZATION.TYPE,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['general', 'about']}
        label={OptionMessage.GENERAL.ABOUT.LABEL}
        tooltip={{ title: OptionMessage.GENERAL.ABOUT.INFO, icon: <InfoCircleOutlined /> }}
      >
        <EditorInput />
      </Form.Item>
    </Form>
  );
};

export default GeneralOptionsForm;
