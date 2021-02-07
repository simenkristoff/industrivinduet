import React from 'react';
import { Upload, Button } from 'antd';
import { ArrowLeftOutlined, FolderAddOutlined, UploadOutlined } from '@ant-design/icons';

import { MediaHeaderInterface } from './interface';
import { NewFolder } from './NewFolder';

export const MediaHeader: React.FC<MediaHeaderInterface> = ({
  path,
  dirNames,
  uploadFile,
  createFolder,
  onBack,
}: MediaHeaderInterface) => {
  const pathPieces = path.length > 0 ? path.split('/') : undefined;

  return (
    <div className='media-header'>
      <div className='header-title'>
        <h1>Mediebibliotek</h1>
        <div className='path'>
          {pathPieces && pathPieces.map((pp) => <span key={pp}>{pp}</span>)}
        </div>
      </div>

      <div className='header-sub'>
        <div className='header-sub-inner'>
          <div className='left'>
            {pathPieces && (
              <Button className='back' icon={<ArrowLeftOutlined />} onClick={onBack}>
                Tilbake
              </Button>
            )}
          </div>
          <div className='right'>
            <NewFolder dirNames={dirNames} path={path} createFolder={createFolder} />
            <Upload
              className='upload'
              showUploadList={false}
              customRequest={(uploadRequest) => uploadFile(uploadRequest.file, path)}
              multiple
              accept='image/png, image/jpeg'
            >
              <Button icon={<UploadOutlined />}>Last opp</Button>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  );
};
