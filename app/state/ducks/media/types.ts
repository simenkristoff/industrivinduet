import { generateAsyncAction } from '@/state/utils/generateAsyncAction';
import { MediaFolderType } from '@/components/MediaLibrary/interface';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

import { media } from '.';

export type MediaState = {
  readonly selectedFile: MediaType | {};
  readonly nodes: MediaType | {};
  readonly loading: boolean;
  readonly errors: Array<String>;
};

export type MediaType = {
  path: string;
  name: string;
  isDir: boolean;
  size: number;
  ext?: string;
  children: Array<MediaType>;
};

export const MediaActionTypes = {
  FETCH: generateAsyncAction('@@media.FETCH'),
  UPLOAD: generateAsyncAction('@@media.UPLOAD'),
  DELETE: generateAsyncAction('@@media.DELETE'),
  CREATE_FOLDER: generateAsyncAction('@@media.CREATE_FOLDER'),
  UPDATE_FOLDER: generateAsyncAction('@@media.UPDATE_FOLDER'),
};

export interface MediaActions {
  fetchFiles: () => IMetaAction;
  uploadFile: (file: MediaType) => IPayloadMetaAction<MediaType>;
  deleteFile: (file: MediaType) => IPayloadMetaAction<MediaType>;
  createFolder: (folder: MediaFolderType) => IPayloadMetaAction<MediaFolderType>;
  updateFodler: (folder: MediaFolderType) => IPayloadMetaAction<MediaFolderType>;
}

export interface MediaPropsAll extends MediaState, MediaActions {}
