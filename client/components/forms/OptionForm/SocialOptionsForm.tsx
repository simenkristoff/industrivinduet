import React from 'react';
import { Form, Input, Space } from 'antd';
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

import { OptionFormInterface } from '@/types';
import { OptionMessage } from '@/constants';

/**
 * Optionform for Social options
 */
const SocialOptionsForm: React.FC<OptionFormInterface> = ({ form, data }: OptionFormInterface) => {
  return (
    <Form
      form={form}
      name='social_options_form'
      initialValues={data}
      layout='vertical'
      requiredMark={false}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Space direction='vertical' size='small' style={{ width: '100%' }}>
          <h3>
            Facebook <FacebookOutlined />
          </h3>
          <Form.Item
            name={['socials', 'facebook', 'name']}
            style={{ marginBottom: '5px' }}
            rules={[{ required: true, message: OptionMessage.SOCIALS.NAME.REQUIRED }]}
          >
            <Input placeholder={OptionMessage.SOCIALS.NAME.LABEL} />
          </Form.Item>
          <Form.Item
            name={['socials', 'facebook', 'link']}
            rules={[
              { required: true, message: OptionMessage.SOCIALS.LINK.REQUIRED },
              { type: 'url', message: OptionMessage.SOCIALS.LINK.TYPE },
            ]}
          >
            <Input placeholder={OptionMessage.SOCIALS.LINK.LABEL} />
          </Form.Item>
        </Space>

        <Space direction='vertical' size='small' style={{ width: '100%' }}>
          <h3>
            Instagram <InstagramOutlined />
          </h3>
          <Form.Item
            name={['socials', 'instagram', 'name']}
            style={{ marginBottom: '5px' }}
            rules={[{ required: true, message: OptionMessage.SOCIALS.NAME.REQUIRED }]}
          >
            <Input placeholder={OptionMessage.SOCIALS.NAME.LABEL} />
          </Form.Item>
          <Form.Item
            name={['socials', 'instagram', 'link']}
            rules={[
              { required: true, message: OptionMessage.SOCIALS.LINK.REQUIRED },
              { type: 'url', message: OptionMessage.SOCIALS.LINK.TYPE },
            ]}
          >
            <Input placeholder={OptionMessage.SOCIALS.LINK.LABEL} />
          </Form.Item>
        </Space>

        <Space direction='vertical' size='small' style={{ width: '100%' }}>
          <h3>
            LinkedIn <LinkedinOutlined />
          </h3>
          <Form.Item
            name={['socials', 'linkedin', 'name']}
            style={{ marginBottom: '5px' }}
            rules={[{ required: true, message: OptionMessage.SOCIALS.NAME.REQUIRED }]}
          >
            <Input placeholder={OptionMessage.SOCIALS.NAME.LABEL} />
          </Form.Item>
          <Form.Item
            name={['socials', 'linkedin', 'link']}
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
