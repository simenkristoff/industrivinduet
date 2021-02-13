import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { IMetaAction, IPayloadMetaAction, ObjectId, ApiResponse, IMeta } from '../../interface';
import { UserPermissions } from '../user/types';
import { MemberEntity } from '../member/types';

export interface AuthState {
  readonly _id: ObjectId | null;
  readonly email: string | null;
  readonly permissions: UserPermissions | null;
  readonly member: MemberEntity | null;
  readonly token: EncodedToken | null;
  readonly isLoggedIn: boolean;
  readonly loading: boolean;
  readonly status: ApiResponse | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  permissions: UserPermissions;
  registerToken: string;
  registerExpires: number;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  password: string;
  confirmedPassword: string;
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
  SEND_FORGOT_PASSWORD: generateAsyncAction('@@auth.SEND_FORGOT_PASSWORD'),
  RESET_PASSWORD: generateAsyncAction('@@auth.RESET_PASSWORD'),
  LOGOUT: '@@auth.LOGOUT',
  CLEAR: '@@auth.CLEAR',
};

export interface AuthActions {
  register: (credentials: RegisterCredentials) => IPayloadMetaAction<RegisterCredentials>;
  login: (credentials: LoginCredentials) => IPayloadMetaAction<LoginCredentials>;
  forgot: (credentials: ForgotPasswordCredentials) => IPayloadMetaAction<ForgotPasswordCredentials>;
  lookupRegisterToken: (token: string) => IPayloadMetaAction<string>;
  logout: () => IMetaAction;
  clear: () => IMetaAction;
}

export interface AuthPropsAll extends AuthState, AuthActions {}
