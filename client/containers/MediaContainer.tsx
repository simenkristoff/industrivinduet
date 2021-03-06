import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Modal } from 'antd';

import { IApplicationState, MediaState, MediaType, MediaFolderType, MediaImageType } from '@/types';
import {
  fetchFiles,
  uploadFile,
  deleteFile,
  createFolder,
  updateFolder,
} from '@/state/ducks/media/actions';
import { Spinner } from '@/components/Spinner';
import { ErrorResponse } from '@/components/ErrorResponse';
import { MediaLibrary } from '@/components/MediaLibrary';

interface MediaContainerInterface {
  modal?: boolean;
  input?: React.RefObject<Input>;
  callback?: (image: MediaImageType) => void;
}

/**
 * Container for MediaLibrary component. Fetches files from api on mount.
 * This container has two render functions if prop modal is true,
 * the MediaLibrary will be rendered inside a modal - usually
 * used by the MediaPicker component to select images inside forms.
 */
export const MediaContainer: React.FC<MediaContainerInterface> = ({
  modal,
  input,
  callback,
}: MediaContainerInterface) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');

  const fileData: MediaState = useSelector(({ media }: IApplicationState) => ({
    selectedFile: media.selectedFile,
    nodes: media.nodes,
    loading: media.loading,
    status: media.status,
  }));

  useEffect(() => {
    dispatch(fetchFiles());
  }, []);

  // Add listener to MediaPicker
  if (input !== undefined) input.current?.input.addEventListener('click', () => handleOpenModal());

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleBackClick = () => {
    const newPath = path.split('/');
    if (newPath.length > 0) {
      newPath.pop();
    }
    setPath(newPath.join('/'));
  };

  const handleFolderClick = (folderPath: string) => {
    setPath(folderPath);
  };

  const handleSelect = (data: MediaType, ref: React.RefObject<HTMLDivElement>) => {
    if (ref !== null) {
      ref.current?.classList.add('active');
    }
  };

  const handleImageSelect = (image: MediaImageType) => {
    if (callback) callback(image);
    if (modal) setVisible(false);

    return image;
  };

  const stateToProps = {
    fileData,
    path,
    inModal: false,
  };

  const dispatchToProps = {
    fetchFiles: useCallback(() => dispatch(fetchFiles()), [dispatch]),
    uploadFile: useCallback((file: File, path: string) => dispatch(uploadFile(file, path)), [
      dispatch,
    ]),
    deleteFile: useCallback((file: MediaType) => dispatch(deleteFile(file)), [dispatch]),
    createFolder: useCallback((folder: MediaFolderType) => dispatch(createFolder(folder)), [
      dispatch,
    ]),
    updateFolder: useCallback((folder: MediaFolderType) => dispatch(updateFolder(folder)), [
      dispatch,
    ]),
    handleBackClick: useCallback(() => handleBackClick(), [path]),
    handleSelect: useCallback(
      (data: MediaType, ref: React.RefObject<HTMLDivElement>) => handleSelect(data, ref),
      [],
    ),
    handleFolderClick: useCallback((path: string) => handleFolderClick(path), []),
    handleImageSelect: useCallback((image: MediaImageType) => handleImageSelect(image), []),
  };

  const renderMediaPicker = () => {
    return (
      <Modal
        className='media-modal'
        visible={visible}
        onCancel={() => setVisible(false)}
        centered
        width='auto'
        okButtonProps={{ style: { display: 'none' } }}
      >
        <MediaLibrary {...stateToProps} {...dispatchToProps} inModal />
      </Modal>
    );
  };

  const renderMediaLibrary = () => {
    return <MediaLibrary {...stateToProps} {...dispatchToProps} />;
  };

  const renderContent = () => {
    if (modal) {
      return renderMediaPicker();
    } else {
      return renderMediaLibrary();
    }
  };

  const render = () => {
    if (fileData.loading) {
      return <Spinner loading={fileData.loading} centered />;
    } else if (fileData.status) {
      return <ErrorResponse response={fileData.status} jumbotron />;
    }

    return renderContent();
  };

  return render();
};

MediaContainer.defaultProps = {
  modal: false,
  input: undefined,
  callback: undefined,
};
