import { MediaFolderType } from '@/components/MediaLibrary/interface';
import { action } from 'typesafe-actions';
import { MediaActionTypes, MediaType } from '@/types';

/**
 * @desc Fetch all Files.
 */
export const fetchFiles = () =>
  action(MediaActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/files',
  });

/**
 * @desc Upload a new File
 * @param file the file to upload
 * @param path the files folder path
 */
export const uploadFile = (file: File, path: string) => {
  const query = path.length > 0 ? `?path=${path}` : '';
  const formData = new FormData();
  formData.append('image', file, path + '/' + file.name);

  return action(MediaActionTypes.UPLOAD.START, formData, {
    method: 'post',
    route: `api/upload${query}`,
  });
};

/**
 * @desc Delete File.
 */
export const deleteFile = (file: MediaType) =>
  action(MediaActionTypes.DELETE.START, [file], {
    method: 'delete',
    route: `api/files`,
  });

/**
 * @desc Create a new Folder
 * @param folder the folder to create
 */
export const createFolder = (folder: MediaFolderType) =>
  action(MediaActionTypes.CREATE_FOLDER.START, folder, {
    method: 'post',
    route: `api/folders`,
  });

/**
 * @desc Update a Folder
 * @param folder the folder to update
 */
export const updateFolder = (folder: MediaFolderType) =>
  action(MediaActionTypes.UPDATE_FOLDER.START, folder, {
    method: 'put',
    route: `api/folders`,
  });
