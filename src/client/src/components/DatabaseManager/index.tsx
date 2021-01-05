import { ColumnsType, TableProps } from 'antd/lib/table';
import React, { useState, useEffect, PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Table, Space } from 'antd';
import { FaEdit, FaTimes, FaPlus } from 'react-icons/fa';
import { FormApi } from 'final-form';

// Components
import { Modal } from 'react-bootstrap';

// Types
import { DatabaseManagerProps } from './interface';

const DeleteSwal = withReactContent(
  Swal.mixin({
    title: 'Vil du fortsette?',
    text: 'Endringen kan ikke gjenopprettes!',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Avbryt',
    focusCancel: true,
    confirmButtonText: 'Fortsett',
  }),
);

const DatabaseManager = <DataType extends { _id?: string }>(props: PropsWithChildren<DatabaseManagerProps<DataType>>) => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState<ColumnsType<DataType>>(props.columns);
  const { name, data, tableConfig, modalConfig, updateObject, addObject, deleteObject, setObject } = props;
  const [show, setShow] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (columns[columns.length - 1].key !== 'action') {
      setColumns([
        ...columns,
        {
          title: 'Handlinger',
          key: 'action',
          align: 'center',
          // eslint-disable-next-line react/display-name
          render: (_text: any, record: DataType) => (
            <Space size='small'>
              <FaEdit className='db-edit' onClick={() => handleEdit(record)} />
              <FaTimes className='db-remove' onClick={() => handleDelete(record._id!)} />
            </Space>
          ),
        },
      ]);
    }
  }, []);

  const handleSubmit = (values: DataType, form: FormApi, callback?: (errors?: any) => void) => {
    return new Promise<boolean | string>((resolve, reject) => {
      if (!values) {
        reject(false);
      } else {
        if (editMode) {
          dispatch(updateObject(values));
        } else {
          dispatch(addObject(values));
        }
        handleClose();
        resolve(true);
      }
    });
  };

  const handleEdit = (record?: DataType) => {
    if (record) {
      setEditMode(true);
      dispatch(setObject(record));
    } else {
      setEditMode(false);
    }
    setShow(true);
  };

  const handleDelete = (id: string) => {
    DeleteSwal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(deleteObject(id));
      }
    });
  };

  const handleClose = () => {
    dispatch(setObject({}));
    setEditMode(false);
    setShow(false);
  };

  const configTable: TableProps<DataType> = {
    rowKey: (record) => {
      return record._id;
    },
    tableLayout: 'auto',
    showSorterTooltip: false,
    pagination: {
      pageSize: 15,
      position: ['bottomCenter'],
    },
    ...tableConfig,
  };

  const renderHeader = () => (
    <div className='db-manager-header'>
      <h2 className='db-manager-title'>{name.plural}</h2>
      <button type='button' className='btn btn-primary' onClick={() => handleEdit()}>
        <FaPlus />
        {name.singular}
      </button>
    </div>
  );

  const renderContent = () => (
    <div className='db-manager-content'>
      <Table dataSource={data} columns={columns} {...configTable} />
    </div>
  );

  const renderForm = (): any => {
    const { component: FormComponent } = props;
    return <FormComponent onSubmit={handleSubmit} editMode={editMode} />;
  };

  const renderModal = () => (
    <Modal show={show} onHide={handleClose} {...modalConfig}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? `Rediger ${name.singular}` : `Legg til ${name.singular}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm()}</Modal.Body>
    </Modal>
  );

  return (
    <div className='card db-manager'>
      {renderHeader()}
      {renderContent()}
      {renderModal()}
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
};

export default DatabaseManager;
