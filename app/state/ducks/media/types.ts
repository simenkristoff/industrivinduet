import { Entity } from '@/types';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';
import { GroupEntity } from '../group/types';

export type MediaState = {
  readonly file: MediaFile | {};
  readonly files: MediaFile[];
  readonly loading: boolean;
  readonly errors: Array<String>;
};

export interface MediaFile {
  name: string;
  url: string;
}

export const MediaActionTypes = {
  FETCH: generateAsyncAction('@@media.FETCH'),
  GET: generateAsyncAction('@@media.GET'),
  UPLOAD: generateAsyncAction('@@media.UPLOAD'),
  DELETE: generateAsyncAction('@@media.DELETE'),
  SET: generateAsyncAction('@@media.SET'),
};

export interface MediaActions {
  fetchFiles: () => IMetaAction;
  getFile: (name: string) => IPayloadMetaAction<string>;
  uploadFile: (file: MediaFile) => IPayloadMetaAction<MediaFile>;
  deleteFile: (file: MediaFile) => IPayloadMetaAction<MediaFile>;
  setFile: (file: MediaFile) => IPayloadAction<MediaFile>;
}

export interface MediaPropsAll extends MediaState, MediaActions {}
