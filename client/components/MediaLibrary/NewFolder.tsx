import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CheckOutlined, FolderAddOutlined } from '@ant-design/icons';

import { MediaFolderType, NewFolderInterface } from '@/types';
import { uniqueName } from '@/utils';

/**
 * New folder button. Handles creation of new folders.
 */
export const NewFolder: React.FC<NewFolderInterface> = ({
  dirNames,
  path,
  createFolder,
}: NewFolderInterface) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      form.resetFields();
      setVisible(false);
      const folderName = value['name'];
      const folderPath = path.length > 0 ? `${path}/${folderName}` : folderName;
      const newFolder: MediaFolderType = {
        path: folderPath,
        name: folderName,
        isDir: true,
        size: 0,
        ext: undefined,
        children: [],
      };
      createFolder(newFolder);
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    handleSubmit();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='new-folder'>
      <Button
        className='new-folder'
        icon={<FolderAddOutlined />}
        onClick={() => setVisible(!visible)}
      >
        Ny mappe
      </Button>
      <div className={`form-popup${!visible ? ' hide' : ''}`}>
        <Form form={form} name='new_folder_form' onKeyPress={handleKeyPress}>
          <Form.Item
            name='name'
            className='mb-0'
            rules={[
              { required: true, message: 'Fyll inn mappenavn' },
              () => ({
                validator(_, value) {
                  return uniqueName({}, value, dirNames, 'Mappen må ha et unikt navn');
                },
              }),
            ]}
          >
            <Input placeholder='Mappenavn' suffix={<CheckOutlined onClick={handleClick} />} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
