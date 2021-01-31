import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, getFile, uploadFile, deleteFile, setFile } from '@/state/ducks/media/actions';
import { MediaFile, MediaState } from '@/state/ducks/media/types';
import { IApplicationState } from '@/state/interface';
import { MediaLibrary } from '@/components/MediaLibrary';

export const MediaContainer = () => {
  const dispatch = useDispatch();
  const stateToProps: MediaState = useSelector(({ media }: IApplicationState) => ({
    file: media.file,
    files: media.files,
    loading: media.loading,
    errors: media.errors,
  }));

  const dispatchToProps = {
    fetchFiles: useCallback(() => dispatch(fetchFiles()), [dispatch]),
    getFile: useCallback((name: string) => dispatch(getFile(name)), [dispatch]),
    uploadFile: useCallback((file: MediaFile) => dispatch(uploadFile(file)), [dispatch]),
    deleteFile: useCallback((file: MediaFile) => dispatch(deleteFile(file)), [dispatch]),
    setFile: useCallback((file: MediaFile) => dispatch(setFile(file)), [dispatch]),
  };

  return <MediaLibrary {...stateToProps} {...dispatchToProps} />;
};
