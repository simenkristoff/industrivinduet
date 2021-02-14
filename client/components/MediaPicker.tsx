import React, { useRef } from 'react';
import { Input, Image } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

import { MediaContainer } from '@/containers/MediaContainer';

interface MediaPickerProps {
  value?: string;
  id?: string;
  onChange?: (value: string) => void;
}

const BACKEND_URL = process.env.BACKEND_URL as string;

export const MediaPicker: React.FC<MediaPickerProps> = ({
  value,
  id,
  onChange,
}: MediaPickerProps) => {
  const inputEl = useRef<Input>(null);

  return (
    <div className='media-picker'>
      {value && (
        <div className='preview'>
          <Image src={`${BACKEND_URL}/media/${value}`} />
        </div>
      )}
      <MediaContainer modal input={inputEl} callback={(image) => onChange!(image.path)} />
      <Input
        ref={inputEl}
        id={id}
        value={value}
        prefix={<FileImageOutlined />}
        readOnly
        placeholder='Velg mediabibliotek'
      />
    </div>
  );
};
