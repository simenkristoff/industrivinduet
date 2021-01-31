import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Entity } from '@/state/interface';
import { CrudInterface } from '@/types';
import { Button, Form, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DataHeader, DataList, DataModal } from '@/components/DataManager';

const CrudContainer = <T extends Entity>(props: CrudInterface<T>): JSX.Element => {
  const [form] = Form.useForm<T>();
  const editMode = useRef<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const {
    state,
    name,
    columns,
    expandable,
    dataForm,
    modal,
    fetch,
    create,
    update,
    remove,
    set,
    dependencies,
  } = props;
  useEffect(() => {
    if (dependencies) {
      Object.keys(dependencies).map((fn) => {
        if (typeof dependencies[fn] === 'function') {
          dependencies[fn]();
        }
      });
    }
    fetch();
  }, []);

  const cols: ColumnsType<T> = [
    ...columns,
    {
      title: 'Handlinger',
      key: 'action',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render: (_text: any, record: T) => (
        <Space size='middle'>
          <Button
            type='ghost'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            type='ghost'
            shape='circle'
            icon={<DeleteOutlined />}
            onClick={() => remove(record)}
          />
        </Space>
      ),
    },
  ];

  const handleSubmit = (record: T) => {
    if (editMode.current) {
      update(record);
    } else {
      create(record);
    }
    handleClose();
  };

  const handleEdit = (record?: T) => {
    if (record) {
      editMode.current = true;
      set(record);
    }
    setVisible(true);
  };

  const handleClose = () => {
    editMode.current = false;
    setVisible(false);
    set({});
  };

  const headerProps = {
    name,
  };

  const headerCallbacks = {
    toggle: useCallback(() => handleEdit(), []),
  };

  const listProps: CrudInterface<T> = {
    ...props,
    expandable,
    columns: cols,
  };

  const listCallbacks = {};

  const modalProps = {
    name,
    editMode: editMode.current,
    visible,
    data: state.byId,
    form,
    dataForm,
    ...modal,
  };

  const modalCallbacks = {
    submit: useCallback((values: T) => handleSubmit(values), []),
    close: useCallback(() => handleClose(), []),
  };

  return (
    <div>
      <DataHeader {...headerProps} {...headerCallbacks} />
      <DataList {...listProps} {...listCallbacks} />
      <DataModal {...modalProps} {...modalCallbacks} />
    </div>
  );
};

export default CrudContainer;
