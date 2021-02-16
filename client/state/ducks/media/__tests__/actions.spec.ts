import { action } from 'typesafe-actions';

import { MediaActionTypes, MediaType } from '@/types';

import { clear, fetchFiles, uploadFile, deleteFile, createFolder, updateFolder } from '../actions';
import { MediaFolderType } from '../types';

import { mediaDirectoryMock, mediaFolderMock, mediaImageMock } from './__mockData__/mediaData';

describe('media actions', () => {
  it('should call @@media.FETCH.START', () => {
    const expectedAction = action(MediaActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/files',
    });

    expect(fetchFiles()).toEqual(expectedAction);
  });

  it('should call @@media.UPLOAD.START', () => {
    const fileMock = new File(['foo'], 'testfile.png', { type: 'image/jpeg' });
    const path = 'profiler';
    const formData = new FormData();
    formData.append('image', fileMock, path + '/' + fileMock.name);
    const expectedAction = action(MediaActionTypes.UPLOAD.START, formData, {
      method: 'post',
      route: `api/upload?path=${path}`,
    });

    expect(uploadFile(fileMock, path)).toEqual(expectedAction);
  });

  it('should call @@media.DELETE.START', () => {
    const payload: MediaType = mediaImageMock;
    const expectedAction = action(MediaActionTypes.DELETE.START, [payload], {
      method: 'delete',
      route: `api/files`,
    });

    expect(deleteFile(payload)).toEqual(expectedAction);
  });

  it('should call @@media.CREATE_FOLDER.START', () => {
    const payload: MediaFolderType = mediaFolderMock;
    const expectedAction = action(MediaActionTypes.CREATE_FOLDER.START, payload, {
      method: 'post',
      route: `api/folders`,
    });

    expect(createFolder(payload)).toEqual(expectedAction);
  });

  it('should call @@media.UPDATE_FOLDER.START', () => {
    const payload: MediaFolderType = mediaFolderMock;
    const expectedAction = action(MediaActionTypes.UPDATE_FOLDER.START, payload, {
      method: 'put',
      route: `api/folders`,
    });

    expect(updateFolder(payload)).toEqual(expectedAction);
  });

  it('should call @media.CLEAR', () => {
    const expectedAction = action(MediaActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
