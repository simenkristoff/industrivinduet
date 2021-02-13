import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Form, Input, Collapse, Row, Col, Select, Checkbox, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { DataFormInterface, IApplicationState, EventEntity, EventOptions } from '@/types';
import { FormMessage, grades } from '@/constants';
import { DatePickerInput, EditorInput, TimePickerInput } from '@/components/adapters';
import { MediaPicker } from '@/components/MediaPicker';

const { Panel } = Collapse;

export const EventForm: React.FC<DataFormInterface<EventEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<EventEntity>) => {
  const eventOptions: EventOptions = useSelector(
    ({ options }: IApplicationState) => options.event as EventOptions,
  );
  const members = useSelector(({ member }: IApplicationState) => member.data);
  const studyfields = useSelector(({ studyfield }: IApplicationState) => studyfield.data);

  const studyfieldsData = _.map((data as EventEntity).studyfields, '_id');

  const initialData = _.isEmpty(data)
    ? { grades, studyfields: _.map(studyfields, '_id') }
    : {
        ...data,
        studyfields: studyfieldsData,
      };

  return (
    <Form
      form={form}
      name='event_form'
      initialValues={initialData}
      layout='vertical'
      requiredMark={false}
    >
      <Row gutter={[16, 16]}>
        <Col flex='auto'>
          <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
            <Input type='hidden' readOnly />
          </Form.Item>

          <Form.Item
            name='description'
            rules={[{ required: true, message: FormMessage.DESCRIPTION.REQUIRED.DEFAULT }]}
          >
            <EditorInput height={500} />
          </Form.Item>
        </Col>

        <Col span={24} md={8}>
          <Collapse defaultActiveKey={['profiling']}>
            <Panel header='Profilering' key='profiling'>
              <Form.Item name='image'>
                <MediaPicker />
              </Form.Item>
            </Panel>

            <Panel header='Generelt' key='general'>
              <Form.Item
                name='active'
                valuePropName='checked'
                label={FormMessage.ACTIVE.LABEL}
                tooltip={{
                  title: FormMessage.ACTIVE.INFO.EVENT,
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name='title'
                label={FormMessage.TITLE.LABEL}
                rules={[{ required: true, message: FormMessage.TITLE.REQUIRED }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='link'
                label={FormMessage.EVENT_LINK.LABEL}
                tooltip={{
                  title: FormMessage.EVENT_LINK.INFO,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  { required: true, message: FormMessage.EVENT_LINK.REQUIRED },
                  { type: 'url', message: FormMessage.EVENT_LINK.TYPE },
                ]}
              >
                <Input type='url' />
              </Form.Item>

              <Form.Item
                name={['studyfields']}
                label={FormMessage.STUDYFIELD.LABEL.SELECT}
                tooltip={{
                  title: FormMessage.STUDYFIELD.INFO.SELECT,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[{ required: true, message: FormMessage.STUDYFIELD.REQUIRED.SELECT }]}
              >
                <Select mode='multiple'>
                  {studyfields.map((studyfield) => {
                    return (
                      <Select.Option key={studyfield._id} value={studyfield._id}>
                        {studyfield.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name='grades'
                label={FormMessage.GRADES.LABEL}
                tooltip={{
                  title: FormMessage.GRADES.INFO,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[{ required: true, message: FormMessage.GRADES.REQUIRED }]}
              >
                <Checkbox.Group>
                  <Row>
                    {grades.map((grade) => (
                      <Col span={8} key={grade}>
                        <Checkbox defaultChecked={true} value={grade}>
                          {grade} trinn
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                name='type'
                label={FormMessage.EVENT.LABEL}
                tooltip={{
                  title: FormMessage.EVENT.INFO,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[{ required: true, message: FormMessage.EVENT.REQUIRED }]}
              >
                <Select>
                  {eventOptions.eventTypes.map((option: string) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name={['member', '_id']}
                label={FormMessage.MEMBER.LABEL.RESPONSIBLE}
                tooltip={{
                  title: FormMessage.MEMBER.INFO.RESPONSIBLE,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[{ required: false, message: FormMessage.MEMBER.REQUIRED }]}
              >
                <Select>
                  {members.map((member) => (
                    <Select.Option key={member._id} value={member._id}>
                      {`${member.name.first} ${member.name.last}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Panel>

            <Panel header='Tid og dato' key='timeanddate'>
              <Form.Item
                name='date'
                label={FormMessage.DATETIME.LABEL.DATE.DEFAULT}
                rules={[{ required: true, message: FormMessage.DATETIME.REQUIRED.DATE.DEFAULT }]}
              >
                <DatePickerInput />
              </Form.Item>

              <Form.Item
                name='starttime'
                label={FormMessage.DATETIME.LABEL.TIME.START}
                rules={[{ required: true, message: FormMessage.DATETIME.REQUIRED.TIME.START }]}
              >
                <TimePickerInput />
              </Form.Item>

              <Form.Item name='endtime' label={FormMessage.DATETIME.LABEL.TIME.END}>
                <TimePickerInput />
              </Form.Item>
            </Panel>

            <Panel header='Lokalisering' key='localization'>
              <Form.Item
                name='place'
                label={FormMessage.PLACE.LABEL.SINGULAR}
                rules={[{ required: true, message: FormMessage.PLACE.REQUIRED.SINGULAR }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name='dining' label={FormMessage.DINING.LABEL}>
                <Input />
              </Form.Item>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </Form>
  );
};
