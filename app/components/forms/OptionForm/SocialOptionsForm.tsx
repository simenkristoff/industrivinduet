import React from 'react';
import { Button, Form, Input, InputNumber, Space, Switch } from 'antd';
import { SocialOptions } from '@/state/ducks/option/types';
import {
  FacebookOutlined,
  InfoCircleOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { OptionMessage } from '@/constants';

import { OptionFormInterface } from './interface';

interface IProps extends OptionFormInterface {
  data: {
    socials: SocialOptions | {};
  };
}

const SocialOptionsForm: React.FC<IProps> = ({ form, data }: IProps) => {
  return (
    <Form
      form={form}
      name='social_options_form'
      initialValues={data.socials}
      layout='vertical'
      requiredMark={false}
    >
      <Space direction='vertical'>
        <Space direction='vertical' size='small'>
          <h3>
            Facebook <FacebookOutlined />
          </h3>
          <Form.Item
            name={['facebook', 'name']}
            style={{ marginBottom: '5px' }}
            rules={[{ required: true, message: OptionMessage.SOCIALS.NAME.REQUIRED }]}
          >
            <Input placeholder={OptionMessage.SOCIALS.NAME.LABEL} />
          </Form.Item>
          <Form.Item
            name={['facebook', 'link']}
            rules={[
              { required: true, message: OptionMessage.SOCIALS.LINK.REQUIRED },
              { type: 'url', message: OptionMessage.SOCIALS.LINK.TYPE },
            ]}
          >
            <Input placeholder={OptionMessage.SOCIALS.LINK.LABEL} />
          </Form.Item>
        </Space>

        <Space direction='vertical' size='small'>
          <h3>
            Instagram <InstagramOutlined />
          </h3>
          <Form.Item
            name={['instagram', 'name']}
            style={{ marginBottom: '5px' }}
            rules={[{ required: true, message: OptionMessage.SOCIALS.NAME.REQUIRED }]}
          >
            <Input placeholder={OptionMessage.SOCIALS.NAME.LABEL} />
          </Form.Item>
          <Form.Item
            name={['instagram', 'link']}
            rules={[
              { required: true, message: OptionMessage.SOCIALS.LINK.REQUIRED },
              { type: 'url', message: OptionMessage.SOCIALS.LINK.TYPE },
            ]}
          >
            <Input placeholder={OptionMessage.SOCIALS.LINK.LABEL} />
          </Form.Item>
        </Space>

        <Space direction='vertical' size='small'>
          <h3>
            LinkedIn <LinkedinOutlined />
          </h3>
          <Form.Item
            name={['linkedin', 'name']}
            style={{ marginBottom: '5px' }}
            rules={[{ required: true, message: OptionMessage.SOCIALS.NAME.REQUIRED }]}
          >
            <Input placeholder={OptionMessage.SOCIALS.NAME.LABEL} />
          </Form.Item>
          <Form.Item
            name={['linkedin', 'link']}
            rules={[
              { required: true, message: OptionMessage.SOCIALS.LINK.REQUIRED },
              { type: 'url', message: OptionMessage.SOCIALS.LINK.TYPE },
            ]}
          >
            <Input placeholder={OptionMessage.SOCIALS.LINK.LABEL} />
          </Form.Item>
        </Space>
      </Space>
    </Form>
  );
};

export default SocialOptionsForm;
