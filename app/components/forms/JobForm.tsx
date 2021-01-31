import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Form, Input, Collapse, Row, Col, Select, Checkbox } from 'antd';
import { JobEntity } from '@/state/ducks/job/types';
import { DataFormInterface, IApplicationState } from '@/types';
import { FormMessage, grades } from '@/constants';
import { DatePickerInput, EditorInput } from '@/components/adapters';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export const JobForm: React.FC<DataFormInterface<JobEntity>> = ({
  form,
  data,
  editMode,
}: DataFormInterface<JobEntity>) => {
  const jobOptions = useSelector(({ options }: IApplicationState) => options.job);
  const members = useSelector(({ member }: IApplicationState) => member.data);
  const studyfields = useSelector(({ studyfield }: IApplicationState) => studyfield.data);

  const studyfieldsData = _.map((data as JobEntity).studyfields, '_id');

  const initialData = _.isEmpty(data)
    ? { grades, studyfields: _.map(studyfields, '_id') }
    : {
        ...data,
        studyfields: studyfieldsData,
      };

  console.log(initialData);

  return (
    <Form
      form={form}
      name='job_form'
      initialValues={initialData}
      layout='vertical'
      requiredMark={false}
    >
      <Row gutter={[16, 16]}>
        <Col flex='auto'>
          <Form.Item name='_id' hidden rules={[{ required: editMode }]}>
            <Input type='hidden' />
          </Form.Item>

          <Form.Item
            name='description'
            rules={[{ required: true, message: FormMessage.DESCRIPTION.REQUIRED.DEFAULT }]}
          >
            <EditorInput />
          </Form.Item>
        </Col>

        <Col span={24} md={8}>
          <Collapse defaultActiveKey={['general']}>
            <Panel header='Generelt' key='general'>
              <Form.Item
                name='title'
                label={FormMessage.TITLE.LABEL}
                rules={[{ required: true, message: FormMessage.TITLE.REQUIRED }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='link'
                label={FormMessage.JOB_LINK.LABEL}
                tooltip={{
                  title: FormMessage.JOB_LINK.INFO,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  { required: true, message: FormMessage.JOB_LINK.REQUIRED },
                  { type: 'url', message: FormMessage.JOB_LINK.TYPE },
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
                  {jobOptions.jobTypes.map((option: string) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Panel>

            <Panel header='Profilering' key='profiling'></Panel>

            <Panel header='Tid og dato' key='timeanddate'>
              <Form.Item
                name='deadline'
                label={FormMessage.DATETIME.LABEL.DATE.DEADLINE}
                rules={[{ required: true, message: FormMessage.DATETIME.REQUIRED.DATE.DEADLINE }]}
              >
                <DatePickerInput />
              </Form.Item>

              <Form.Item name='startdate' label={FormMessage.DATETIME.LABEL.DATE.START}>
                <DatePickerInput />
              </Form.Item>
            </Panel>

            <Panel header='Lokalisering' key='localization'>
              <Form.Item
                name={['places']}
                label={FormMessage.PLACE.LABEL.PLURAL}
                rules={[{ required: true, message: FormMessage.PLACE.REQUIRED.PLURAL }]}
              >
                <Select mode='tags'>
                  {(data as JobEntity).places.map((place) => (
                    <Select.Option key={place} value={place}>
                      {place}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </Form>
  );
};
