import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { Entity, DataModalInterface } from '@/types';

export const DataModal = <T extends Entity>(props: DataModalInterface<T>): JSX.Element => {
  const { name, editMode, visible, data, width, form, dataForm, submit, close } = props;
  const DataForm = dataForm;

  useEffect(() => {
    form?.resetFields();
  }, [visible]);

  const style: React.CSSProperties = {
    maxWidth: '1200px',
  };

  return (
    <Modal
      title={editMode ? `Rediger ${name.singular}` : `Legg til ${name.singular}`}
      style={style}
      width={width}
      okText={editMode ? 'Lagre' : 'Legg til'}
      visible={visible}
      afterClose={() => {
        form?.resetFields();
      }}
      onCancel={() => {
        form.resetFields();
        close();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            submit(values);
          })
          .catch((info) => {
            console.warn('Validation failed: ', info);
          });
      }}
    >
      <DataForm form={form} data={data} editMode={editMode} />
    </Modal>
  );
};
