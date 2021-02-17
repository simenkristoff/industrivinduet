import { Entity } from '@/types';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { BaseState, IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

/**
 * Type describing the Content state.
 */
export type ContentState = BaseState<ContentEntity>;

/**
 * Interface describing a Content Entity.
 */
export interface ContentEntity extends Entity {
  title: string;
  displayTitle: boolean;
  linkText: string;
  content: string;
  priority: number;
}

/**
 * Object containing the action types for the Content state.
 */
export const ContentActionTypes = {
  FETCH: generateAsyncAction('@@content.FETCH'),
  CREATE: generateAsyncAction('@@content.CREATE'),
  UPDATE: generateAsyncAction('@@content.UPDATE'),
  DELETE: generateAsyncAction('@@content.DELETE'),
  SET: generateAsyncAction('@@content.SET'),
  CLEAR: '@@content.CLEAR',
};

/**
 * Interface for all the available Content state actions.
 */
export interface ContentActions {
  fetchContents: () => IMetaAction;
  createContent: (content: ContentEntity) => IPayloadMetaAction<ContentEntity>;
  updateContent: (content: ContentEntity) => IPayloadMetaAction<ContentEntity>;
  deleteContent: (content: ContentEntity) => IPayloadMetaAction<ContentEntity>;
  setContent: (content: ContentEntity) => IPayloadAction<ContentEntity>;
  clear: () => IMetaAction;
}

/**
 * Interface describing all props and actions of ContentState
 */
export interface ContentPropsAll extends ContentState, ContentActions {}
