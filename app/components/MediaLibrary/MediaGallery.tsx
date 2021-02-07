import _ from 'lodash';
import React from 'react';
import { Row } from 'antd';

import { MediaGalleryInterface } from './interface';

import { MediaFolder, MediaImage } from '.';

export const MediaGallery: React.FC<MediaGalleryInterface> = ({
  data,
  dirNames,
  inModal,
  deleteFile,
  updateFolder,
  handleSelect,
  handleFolderClick,
  handleImageSelect,
}: MediaGalleryInterface) => {
  return (
    <div className='media-gallery-wrapper'>
      <Row className='media-gallery'>
        {data.directories.length > 0 &&
          data.directories.map((dir) => (
            <MediaFolder
              deleteFile={deleteFile}
              updateFolder={updateFolder}
              onSelect={handleSelect}
              onFolderClick={handleFolderClick}
              key={dir.name}
              data={dir}
              dirNames={dirNames}
            />
          ))}
        {data.images.length > 0 &&
          data.images.map((image) => (
            <MediaImage
              inModal={inModal}
              deleteFile={deleteFile}
              onSelect={handleSelect}
              onImageSelect={handleImageSelect}
              key={image.name}
              data={image}
            />
          ))}
      </Row>
    </div>
  );
};
