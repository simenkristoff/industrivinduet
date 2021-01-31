import React, { useEffect } from 'react';
import { MediaFile, MediaPropsAll } from '@/state/ducks/media/types';

export const MediaLibrary: React.FC<MediaPropsAll> = (props: MediaPropsAll) => {
  const {
    file,
    files,
    loading,
    errors,
    fetchFiles,
    getFile,
    uploadFile,
    deleteFile,
    setFile,
  } = props;

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleClick = (event: any) => {
    const file: MediaFile = {
      name: 'hei',
      url: event.target.currentSrc,
    };
    setFile(file);
  };

  return (
    <div>
      <h1>Filer</h1>
      {files.map((file, index) => (
        <img
          width='150'
          height='150'
          src={file.url}
          key={file.name}
          alt={file.name}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};
