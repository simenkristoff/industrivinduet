import { Entity } from '@/types';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { BaseState, IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';
import { MemberEntity } from '../member/types';

export enum UserPermissions {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/**
 * @desc Type describing the User state.
 */
export type UserState = BaseState<UserEntity>;

/**
 * @desc Interface describing a User Entity.
 */
export interface UserEntity extends Entity {
  email: string;
  permissions: UserPermissions;
  member: MemberEntity;
}

/**
 * @desc Object containing the action types for the User state.
 */
export const UserActionTypes = {
  FETCH: generateAsyncAction('@@user.FETCH'),
  CREATE: generateAsyncAction('@@user.CREATE'),
  UPDATE: generateAsyncAction('@@user.UPDATE'),
  DELETE: generateAsyncAction('@@user.DELETE'),
  SET: generateAsyncAction('@@user.SET'),
};

/**
 * @desc Interface for all the available User state actions.
 */
export interface UserActions {
  fetchUsers: () => IMetaAction;
  createUser: (user: UserEntity) => IPayloadMetaAction<UserEntity>;
  updateUser: (user: UserEntity) => IPayloadMetaAction<UserEntity>;
  deleteUser: (user: UserEntity) => IPayloadMetaAction<UserEntity>;
  setUser: (user: UserEntity) => IPayloadAction<UserEntity>;
}

/**
 * @desc Interface describing all props and actions of UserState
 */
export interface UserPropsAll extends UserState, UserActions {}
