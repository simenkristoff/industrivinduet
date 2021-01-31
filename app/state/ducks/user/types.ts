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

export enum UserPermissions {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserEntity extends Entity {
  email: string;
  password: string;
  permissions: UserPermissions;
  member: MemberEntity;
}

export interface UserPropsAll extends UserState {}
