import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, MediaActionTypes } from '@/types';
import apiCaller, { fileApiCaller } from '@/state/utils/apiCaller';

import { clear, fetchFiles, uploadFile, deleteFile, createFolder, updateFolder } from '../actions';
import { MediaFolderType } from '../types';
import mediaSaga from '../sagas';

import { mediaDirectoryMock, mediaFolderMock, mediaImageMock } from './__mockData__/mediaData';

describe('media saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(apiCaller), mediaDirectoryMock]])
      .put({ type: MediaActionTypes.FETCH.SUCCESS, payload: mediaDirectoryMock })
      .dispatch(fetchFiles())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: MediaActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchFiles())
      .run();
  });

  it('should handle upload success', () => {
    const fileMock = new File(['foo'], 'testfile.png', { type: 'image/jpeg' });
    const path = 'profiler';

    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(fileApiCaller), mediaImageMock]])
      .put({ type: MediaActionTypes.UPLOAD.SUCCESS, payload: mediaImageMock })
      .dispatch(uploadFile(fileMock, path))
      .run();
  });

  it('should handle upload error', () => {
    const fileMock = new File(['foo'], 'testfile.png', { type: 'image/jpeg' });
    const path = 'profiler';
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(fileApiCaller), throwError(error)]])
      .put({ type: MediaActionTypes.UPLOAD.ERROR, payload: apiResponse })
      .dispatch(uploadFile(fileMock, path))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(apiCaller), []]])
      .put({ type: MediaActionTypes.DELETE.SUCCESS, payload: [mediaImageMock] })
      .dispatch(deleteFile(mediaImageMock))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: MediaActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deleteFile(mediaImageMock))
      .run();
  });

  it('should handle create folder success', () => {
    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(apiCaller), []]])
      .put({ type: MediaActionTypes.CREATE_FOLDER.SUCCESS, payload: mediaFolderMock })
      .dispatch(createFolder(mediaFolderMock))
      .run();
  });

  it('should handle create folder error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: MediaActionTypes.CREATE_FOLDER.ERROR, payload: apiResponse })
      .dispatch(createFolder(mediaFolderMock))
      .run();
  });

  it('should handle update folder success', () => {
    const newFolder = { ...mediaFolderMock, name: 'oppdatert' };

    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(apiCaller), []]])
      .put({ type: MediaActionTypes.UPDATE_FOLDER.SUCCESS, payload: newFolder })
      .dispatch(updateFolder(newFolder))
      .run();
  });

  it('should handle update folder error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(mediaSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: MediaActionTypes.UPDATE_FOLDER.ERROR, payload: apiResponse })
      .dispatch(updateFolder(mediaFolderMock))
      .run();
  });
});
