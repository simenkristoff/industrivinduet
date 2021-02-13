import React from 'react';
import { Button, Form, Input, InputNumber, Space, Switch } from 'antd';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { OptionFormInterface } from '@/types';
import { OptionMessage } from '@/constants';

const JobOptionsForm: React.FC<OptionFormInterface> = ({ form, data }: OptionFormInterface) => {
  return (
    <Form
      form={form}
      name='job_options_form'
      initialValues={data}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item
        name={['job', 'homepage', 'displayJobs']}
        label={OptionMessage.EVENT.DISPLAY.LABEL}
        tooltip={{ title: OptionMessage.EVENT.DISPLAY.INFO, icon: <InfoCircleOutlined /> }}
        valuePropName='checked'
      >
        <Switch />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => {
          return (
            <Form.Item
              name={['job', 'homepage', 'numberOfJobs']}
              label={OptionMessage.EVENT.AMOUNT.LABEL}
              tooltip={{ title: OptionMessage.EVENT.AMOUNT.INFO, icon: <InfoCircleOutlined /> }}
              rules={[{ required: true }]}
            >
              <InputNumber
                min={1}
                max={6}
                disabled={!form.getFieldValue(['job', 'homepage', 'displayJobs'])}
              />
            </Form.Item>
          );
        }}
      </Form.Item>

      <Space direction='vertical'>
        <label htmlFor='jobTypes'>{OptionMessage.EVENT.TYPE.LABEL}</label>
        <Form.List name={['job', 'jobTypes']}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field) => (
                  <Space key={field.key} style={{ display: 'flex' }} align='baseline'>
                    <Form.Item
                      name={[field.name]}
                      fieldKey={[field.fieldKey]}
                      rules={[{ required: true, message: OptionMessage.EVENT.TYPE.CHILD.REQUIRED }]}
                    >
                      <Input placeholder={OptionMessage.EVENT.TYPE.CHILD.LABEL} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item style={{ maxWidth: '180px' }}>
                  <Button
                    className='ant-input'
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Legg til ny
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Space>
    </Form>
  );
};

export default JobOptionsForm;
