import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { IMetaAction, IPayloadMetaAction, ObjectId } from '../../interface';
import { UserPermissions } from '../user/types';
import { MemberEntity } from '../member/types';

export interface AuthState {
  readonly _id: ObjectId | null;
  readonly email: string | null;
  readonly permissions: UserPermissions | null;
  readonly member: MemberEntity | null;
  readonly token: EncodedToken | null;
  readonly isLoggedIn: boolean;
  readonly loginFailed: boolean;
  readonly loggingIn: boolean;
  readonly errors: Array<String>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  permissions: UserPermissions;
}

export type EncodedToken = string;

export interface DecodedToken {
  exp: number;
  iat: number;
  iss: String;
  sub: {
    id: ObjectId;
    email: string;
    permissions: UserPermissions;
    member: MemberEntity;
  };
}

export interface Token extends DecodedToken {
  encodedToken: EncodedToken;
}

/* Cookie */
export type GetCookie = (arg0: string) => EncodedToken | undefined;

export const AuthActionTypes = {
  REGISTER: generateAsyncAction('@@auth.REGISTER'),
  LOGIN: generateAsyncAction('@@auth.LOGIN'),
  LOGOUT: generateAsyncAction('@@auth.LOGOUT'),
  CLEAR: '@@auth.CLEAR',
};

export interface AuthActions {
  register: (credentials: RegisterCredentials) => IPayloadMetaAction<RegisterCredentials>;
  login: (credentials: LoginCredentials) => IPayloadMetaAction<LoginCredentials>;
  logout: () => IMetaAction;
}

export interface AuthPropsAll extends AuthState, AuthActions {}
