import React from 'react';
import { Button, Form, Input, InputNumber, Space, Switch } from 'antd';
import { EventOptions } from '@/state/ducks/option/types';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { OptionMessage } from '@/constants';

import { OptionFormInterface } from './interface';

interface IProps extends OptionFormInterface {
  data: {
    event: EventOptions | {};
  };
}

const EventOptionsForm: React.FC<IProps> = ({ form, data }: IProps) => {
  console.log(data);

  return (
    <Form
      form={form}
      name='event_options_form'
      initialValues={data.event}
      layout='vertical'
      requiredMark={false}
    >
      <Form.Item
        name={['homepage', 'displayEvents']}
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
              name={['homepage', 'numberOfEvents']}
              label={OptionMessage.EVENT.AMOUNT.LABEL}
              tooltip={{ title: OptionMessage.EVENT.AMOUNT.INFO, icon: <InfoCircleOutlined /> }}
              rules={[{ required: true }]}
            >
              <InputNumber
                min={1}
                max={6}
                disabled={!form.getFieldValue(['homepage', 'displayEvents'])}
              />
            </Form.Item>
          );
        }}
      </Form.Item>

      <Space direction='vertical'>
        <label htmlFor='eventTypes'>{OptionMessage.EVENT.TYPE.LABEL}</label>
        <Form.List name='eventTypes'>
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

export default EventOptionsForm;
