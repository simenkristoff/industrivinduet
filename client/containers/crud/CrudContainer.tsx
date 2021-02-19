import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Button, Form, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import {
  Entity,
  IApplicationState,
  CrudInterface,
  DataListInterface,
  UserPermissions,
} from '@/types';
import { DataHeader, DataList, DataModal } from '@/components/DataManager';
import { Spinner } from '@/components/Spinner';
import { ErrorResponse } from '@/components/ErrorResponse';
import { fireActionVerify } from '@/utils';

/**
 * Container for DataManagement. This container handles all CRUD actions for
 * generic Entities stored in the database. Will fetch dependencies on mount
 * and sets up data table for displaying all entries.
 */
export const CrudContainer = <T extends Entity>(props: CrudInterface<T>): JSX.Element => {
  const permission: UserPermissions | null = useSelector(
    ({ auth }: IApplicationState) => auth.permissions,
  );
  let hasPermission = false;

  const [form] = Form.useForm<T>();
  const editMode = useRef<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const {
    state,
    name,
    columns,
    expandable,
    collection,
    dataForm,
    modal,
    fetch,
    create,
    update,
    remove,
    set,
    dependencies,
    requireAdmin,
  } = props;

  const requireAdminPermission = requireAdmin !== undefined ? requireAdmin : true;

  if (
    (permission && permission == UserPermissions['ADMIN'] && requireAdminPermission) ||
    !requireAdminPermission
  ) {
    hasPermission = true;
  }

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
      className: 'hide-sm',
      key: 'action',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render: (_text: any, record: T) => (
        <Space size='middle'>
          <Button
            type='ghost'
            shape='circle'
            icon={<EditOutlined />}
            disabled={!hasPermission}
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            type='ghost'
            shape='circle'
            icon={<DeleteOutlined />}
            disabled={!hasPermission}
            onClick={() => handleRemove(record)}
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

  const handleRemove = (record: T) => {
    fireActionVerify(collection).then((result) => {
      if (result.isConfirmed) {
        remove(record);
      }
    });
  };

  const handleClose = () => {
    editMode.current = false;
    setVisible(false);
    set({});
  };

  const headerProps = {
    hasPermission,
    name,
  };

  const headerCallbacks = {
    toggle: useCallback(() => handleEdit(), []),
  };

  const listProps: DataListInterface<T> = {
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

  const render = () => {
    if (state.loading && !state.status) {
      return <Spinner loading={state.loading} centered />;
    } else if (state.status) {
      return <ErrorResponse response={state.status} jumbotron />;
    }

    return [
      <DataList {...listProps} {...listCallbacks} key='data-list' />,
      <DataModal {...modalProps} {...modalCallbacks} key='data-modal' />,
    ];
  };

  return (
    <div className='content-manager'>
      <DataHeader {...headerProps} {...headerCallbacks} />
      {render()}
    </div>
  );
};
