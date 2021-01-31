import { Entity } from '@/types';

import { generateAsyncAction } from '../../utils';
import { IMetaAction, IPayloadMetaAction } from '../../interface';
import { MemberEntity } from '../member/types';

export interface UserState {
  readonly byId: UserEntity | {};
  readonly data: UserEntity[];
  readonly loading: boolean;
  readonly errors: Array<String>;
}

export interface UserEntity extends Entity {
  email: string;
  password: string;
  permissions: string[];
  member: MemberEntity;
}

export const UserActionTypes = {
  FETCH: generateAsyncAction('@@user.FETCH'),
  UPDATE: generateAsyncAction('@@user.UPDATE'),
  DELETE: generateAsyncAction('@@user.DELETE'),
};

export interface UserActions {
  fetchUsers: () => IMetaAction;
  updateUser: (user: UserEntity) => IPayloadMetaAction<UserEntity>;
  deleteUser: (user: UserEntity) => IPayloadMetaAction<UserEntity>;
}

export interface UserPropsAll extends UserState, UserActions {}
