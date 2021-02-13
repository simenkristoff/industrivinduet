import { Entity } from '@/types';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { BaseState, IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

/**
 * @desc Type describing the Group state.
 */
export type GroupState = BaseState<GroupEntity>;

/**
 * @desc Interface describing a Group Entity.
 */
export interface GroupEntity extends Entity {
  name: string;
}

/**
 * @desc Object containing the action types for the Group state.
 */
export const GroupActionTypes = {
  FETCH: generateAsyncAction('@@group.FETCH'),
  CREATE: generateAsyncAction('@@group.CREATE'),
  UPDATE: generateAsyncAction('@@group.UPDATE'),
  DELETE: generateAsyncAction('@@group.DELETE'),
  SET: generateAsyncAction('@@group.SET'),
  CLEAR: '@@group.CLEAR',
};

/**
 * @desc Interface for all the available Group state actions.
 */
export interface GroupActions {
  fetchGroups: () => IMetaAction;
  createGroup: (group: GroupEntity) => IPayloadMetaAction<GroupEntity>;
  updateGroup: (group: GroupEntity) => IPayloadMetaAction<GroupEntity>;
  deleteGroup: (group: GroupEntity) => IPayloadMetaAction<GroupEntity>;
  setGroup: (group: GroupEntity) => IPayloadAction<GroupEntity>;
  clear: () => IMetaAction;
}

/**
 * @desc Interface describing all props and actions of GroupState
 */
export interface GroupPropsAll extends GroupState, GroupActions {}
