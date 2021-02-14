import React, { useRef } from 'react';
import { Col, Image } from 'antd';
import { DeleteOutlined, SelectOutlined } from '@ant-design/icons';

import { MediaImageInterface } from '@/types';

import { MediaHelpers } from './';

const BACKEND_URL = process.env.BACKEND_URL as string;

export const MediaImage: React.FC<MediaImageInterface> = ({
  data,
  inModal,
  deleteFile,
  onSelect,
  onImageSelect,
}: MediaImageInterface) => {
  const mediaEl = useRef<HTMLDivElement>(null);
  const { path, name, isDir, size, ext } = data;
  if (isDir) return null;

  const url = `${BACKEND_URL}/media/${path}`;

  const formattedSize = MediaHelpers.formatBytes(size);

  return (
    <Col className='media-image-wrapper' onClick={() => onSelect(data, mediaEl)}>
      <div ref={mediaEl} className='media-image'>
        <div className='actions'>
          {inModal && (
            <SelectOutlined className='action-select' onClick={() => onImageSelect(data)} />
          )}

          <DeleteOutlined className='action-delete' onClick={() => deleteFile(data)} />
        </div>
        <Image src={url} alt={name} preview={true} />
        <div className='image-details'>
          <span className='name'>
            {name}
            {ext}
          </span>
          <span className='size'>{formattedSize}</span>
        </div>
        <div className='overlay' />
      </div>
    </Col>
  );
};
