import { action } from 'typesafe-actions';

import { MediaActionTypes, MediaFile } from './types';

/**
 * @desc Fetch all Files.
 */
export const fetchFiles = () =>
  action(MediaActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/files',
  });

/**
 * @desc Get a File
 * @param name name of the file
 */
export const getFile = (name: string) =>
  action(MediaActionTypes.GET.START, name, {
    method: 'get',
    route: `api/files/${name}`,
  });

/**
 * @desc Upload a new File
 * @param file the file to upload
 */
export const uploadFile = (file: MediaFile) =>
  action(MediaActionTypes.UPLOAD.START, file, {
    method: 'post',
    route: 'api/upload',
  });

/**
 * @desc Delete File.
 */
export const deleteFile = (file: MediaFile) =>
  action(MediaActionTypes.DELETE.START, file, {
    method: 'delete',
    route: `api/files/${file.name}`,
  });

/**
 * @desc Set File.
 */
export const setFile = (file: MediaFile) => action(MediaActionTypes.SET.START, file);
