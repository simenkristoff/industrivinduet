import React from 'react';
import _ from 'lodash';
import { Layout, Form, Checkbox, Select, Space, Button } from 'antd';
import { Entity, FilterDependency, ResultFilterInterface } from '@/types';
import { FilterOutlined } from '@ant-design/icons';

const { Sider } = Layout;

function renderSelectFilter<T extends Entity>(
  key: string,
  dependency: FilterDependency,
  field?: string,
  label?: string,
  postfix?: string,
) {
  return (
    <Form.Item name={key} label={label && label}>
      <Select defaultValue=''>
        <Select.Option value=''>Alle</Select.Option>
        {dependency.map((item) => {
          const key = field ? (item as T)._id : item;
          const value = field ? (item as T)._id : item;
          const name = field ? (item as any)[field] : item;

          return (
            <Select.Option key={key} value={value}>
              {name}
              {postfix && postfix}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
}

function renderCheckboxFilter<T extends Entity>(
  key: string,
  dependency: FilterDependency,
  field?: string,
  label?: string,
  postfix?: string,
) {
  return (
    <Form.Item name={key} label={label && label}>
      <Checkbox.Group>
        <Space direction='vertical'>
          {dependency?.map((item) => {
            const key = field ? (item as T)._id : item;
            const value = field ? (item as T)._id : item;
            const name = field ? (item as any)[field] : item;

            return (
              <Checkbox key={key} value={value}>
                {name}
                {postfix && postfix}
              </Checkbox>
            );
          })}
        </Space>
      </Checkbox.Group>
    </Form.Item>
  );
}

export const ResultFilter = <T extends Entity>({
  originalSize,
  filteredSize,
  filterTypes,
  onFilterChange,
  onFilterReset,
}: ResultFilterInterface<T>): JSX.Element => {
  const [form] = Form.useForm<T>();

  return (
    <Sider
      trigger={<FilterOutlined />}
      collapsible
      collapsedWidth={0}
      breakpoint='lg'
      className='result-filter'
    >
      <Form form={form} onFieldsChange={onFilterChange} layout='vertical' className='filters'>
        <div className='filter-info'>
          <div className='filter-results'>
            <div className='current'>
              <h4>{filteredSize}</h4>
              <br />
              <span>Aktuelle</span>
            </div>
            <div className='separator'>
              <h4>/</h4>
            </div>
            <div className='current'>
              <h4>{originalSize}</h4>
              <br />
              <span>Totalt</span>
            </div>
          </div>
        </div>
        <Form.Item>
          <Button
            type='primary'
            size='large'
            style={{ width: '100%' }}
            onClick={() => onFilterReset(form)}
          >
            Tilbakestill
          </Button>
        </Form.Item>
        {Object.entries(filterTypes).map(([key, value]) => {
          if (!value) return;
          const { type, field, dependency, label, postfix } = value;
          if (!type || !dependency) return;

          switch (type) {
            case 'select':
              return renderSelectFilter<T>(key, dependency, field, label, postfix);
            case 'checkbox':
            default:
              return renderCheckboxFilter<T>(key, dependency, field, label, postfix);
          }
        })}
      </Form>
    </Sider>
  );
};
