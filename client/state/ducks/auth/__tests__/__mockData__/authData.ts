import {
  UserEntity,
  UserPermissions,
  AuthState,
  EncodedToken,
  LoginCredentials,
  RegisterCredentials,
} from '@/types';

import { ForgotPasswordCredentials, ResetPasswordCredentials } from '../../types';

export const authToken: EncodedToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJbmR1c3RyaXZpbmR1ZXQiLCJzdWIiOnsiaWQiOiI2MDI3ZGFkMjYwY2EzNjVhNzAxMThiYWIiLCJlbWFpbCI6ImFkbWluQGluZHVzdHJpdmluZHVldC5ubyIsInBlcm1pc3Npb25zIjoiQURNSU4ifSwiaWF0IjoxNjEzNDc1MDQwODMzLCJleHAiOjE2MTM1NjE0NDA4MzN9.4GJduWJJqbBxRGhIRkZQLkxRRhjmLmHfAEvuxTgA0T0';
export const registerToken = '3f62c4e1bfc00d93ef532bad256757dc538ad5cc5f6a252507114f26a81153cd';
export const registerExpires = new Date().getTime();
export const resetPassswordToken =
  '3f62c4e1bfc00d93ef532bad256757dc538ad5cc5f6a252507114f26a81153cd';

export const loginCredentials: LoginCredentials = {
  email: 'admin@industrivinduet.no',
  password: '123456',
};

export const registerCredentials: RegisterCredentials = {
  email: 'admin@industrivinduet.no',
  permissions: UserPermissions.ADMIN,
  password: '123456',
  registerToken,
  registerExpires,
};

export const forgotPasswordCredentials: ForgotPasswordCredentials = {
  email: 'admin@industrivinduet.no',
};

export const resetPasswordCredentials: ResetPasswordCredentials = {
  token: resetPassswordToken,
  password: '1234567',
  confirmedPassword: '1234567',
};

export const authUser: UserEntity = {
  _id: '6027dad260ca365a70118bab',
  permissions: UserPermissions.ADMIN,
  member: null,
  isRoot: true,
  isRegistered: true,
  email: 'admin@industrivinduet.no',
};

export const signedOutState: AuthState = {
  _id: null,
  email: null,
  permissions: null,
  member: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  status: null,
};

export const signedInState: AuthState = {
  _id: authUser['_id'],
  email: authUser['email'],
  permissions: authUser['permissions'],
  member: authUser['member'],
  token: authToken,
  isLoggedIn: true,
  loading: false,
  status: null,
};

export default {
  authUser,
  authToken,
  signedOutState,
  signedInState,
};
