import { Entity } from '@/types';

import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { BaseState, IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';
import { GroupEntity } from '../group/types';

/**
 * @desc Type describing the Role state.
 */
export type RoleState = BaseState<RoleEntity>;

/**
 * @desc Interface describing a Role Entity.
 */
export interface RoleEntity extends Entity {
  name: string;
  roleType: 'Leder' | 'Nestleder' | 'Medlem';
  group: GroupEntity | null;
}

/**
 * @desc Object containing the action types for the Role state.
 */
export const RoleActionTypes = {
  FETCH: generateAsyncAction('@@role.FETCH'),
  CREATE: generateAsyncAction('@@role.CREATE'),
  UPDATE: generateAsyncAction('@@role.UPDATE'),
  DELETE: generateAsyncAction('@@role.DELETE'),
  SET: generateAsyncAction('@@role.SET'),
};

/**
 * @desc Interface for all the available Role state actions.
 */
export interface RoleActions {
  fetchRoles: () => IMetaAction;
  createRole: (role: RoleEntity) => IPayloadMetaAction<RoleEntity>;
  updateRole: (role: RoleEntity) => IPayloadMetaAction<RoleEntity>;
  deleteRole: (role: RoleEntity) => IPayloadMetaAction<RoleEntity>;
  setRole: (role: RoleEntity) => IPayloadAction<RoleEntity>;
}

/**
 * @desc Interface describing all props and actions of RoleState
 */
export interface RolePropsAll extends RoleState, RoleActions {}
