import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { MediaLibraryInterface, MediaLibraryItems } from '@/types';

import { MediaHeader, MediaGallery, MediaHelpers } from './';

export const MediaLibrary: React.FC<MediaLibraryInterface> = ({
  fileData,
  path,
  inModal,
  uploadFile,
  deleteFile,
  createFolder,
  updateFolder,
  handleBackClick,
  handleSelect,
  handleFolderClick,
  handleImageSelect,
}: MediaLibraryInterface) => {
  const [items, setItems] = useState<MediaLibraryItems>({
    directories: [],
    images: [],
  });
  const dirNames = _.map(items.directories, 'name');

  useEffect(() => {
    if (Object.keys(fileData.nodes).length > 0) {
      setItems(MediaHelpers.renderTree(fileData.nodes, path));
    }
  }, [path]);

  return (
    <div className='media-library'>
      <MediaHeader
        path={path}
        dirNames={dirNames}
        uploadFile={uploadFile}
        onBack={handleBackClick}
        createFolder={createFolder}
      />
      <MediaGallery
        data={items}
        dirNames={dirNames}
        inModal={inModal}
        deleteFile={deleteFile}
        updateFolder={updateFolder}
        handleSelect={handleSelect}
        handleFolderClick={handleFolderClick}
        handleImageSelect={handleImageSelect}
      />
    </div>
  );
};

MediaLibrary.defaultProps = {
  inModal: false,
};
