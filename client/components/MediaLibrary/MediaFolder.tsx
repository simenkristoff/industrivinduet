import React, { useEffect, useRef, useState } from 'react';
import { Col, Input } from 'antd';
import { DeleteOutlined, EditOutlined, FolderFilled } from '@ant-design/icons';

import { MediaFolderInterface, MediaFolderType } from '@/types';
import { fireFolderDeleteVerify } from '@/utils';

/**
 * Renders a folder in the media library.
 */
export const MediaFolder: React.FC<MediaFolderInterface> = ({
  data,
  dirNames,
  deleteFile,
  updateFolder,
  onSelect,
  onFolderClick,
}: MediaFolderInterface) => {
  const [error, setError] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(data.name);
  const mediaEl = useRef<HTMLDivElement>(null);
  const { isDir, path } = data;
  if (!isDir) return null;

  useEffect(() => {
    if (!edit && !error && isValid()) {
      const updatedFolder: MediaFolderType = {
        ...data,
        name: folderName,
      };
      updateFolder(updatedFolder);
    }
  }, [edit]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isValid = (): boolean => {
    return folderName !== data.name && folderName.length > 0;
  };

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (dirNames.some((element) => element === value)) {
      setError(true);
    } else {
      setError(false);
    }

    setFolderName(value);
  };

  const handleDelete = () => {
    fireFolderDeleteVerify().then((result) => {
      if (result.isConfirmed) {
        deleteFile(data);
      }
    });
  };

  const handleDoubleClick = () => {
    setEdit(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' && isValid()) {
      setEdit(false);
    }
  };

  const handleClickOutside = (event: any) => {
    if (mediaEl && !mediaEl.current?.contains(event.target)) {
      setEdit(false);
    }
  };

  return (
    <Col className='media-folder-wrapper' onClick={() => onSelect(data, mediaEl)}>
      <div ref={mediaEl} className='media-folder'>
        <div className='actions'>
          <EditOutlined className='action-edit' onClick={() => setEdit(true)} />
          <DeleteOutlined className='action-delete' onClick={() => handleDelete()} />
        </div>
        <FolderFilled className='folder-wrapper' onDoubleClick={() => onFolderClick(path)} />
        <Input
          type='text'
          readOnly={!edit}
          className={`media-input ${edit && 'edit'} ${error && 'error'}`}
          placeholder='Mappenavn'
          value={folderName}
          onChange={handleEdit}
          onDoubleClick={handleDoubleClick}
          onKeyPress={handleKeyPress}
        />
        <div className='overlay' />
      </div>
    </Col>
  );
};
