import { UserEntity } from '@/state/ducks/user/types';

import { AuthState, EncodedToken, LoginCredentials } from '../../types';

export const authLogin: LoginCredentials = {
  email: 'simen.kristoffersen98@gmail.com',
  password: '123456',
};

export const authUser: UserEntity = {
  _id: 'admin123',
  permissions: ['USER', 'ADMIN'],
  email: 'simen.kristoffersen98@gmail.com',
  password: '123456',
  member: {
    _id: 'd033e22ae348aeb5660fc214',
    name: {
      first: 'Simen',
      last: 'Kristoffersen',
    },
    email: 'simen.kristoffersen98@gmail.com',
    phone: '90360922',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    role: null,
  },
};

export const authToken: EncodedToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJbmR1c3RyaXZpbmR1ZXQiLCJzdWIiOnsiaWQiOiI2MDA5OTYxNDk1YjU0ZTI2Zjg3NmI4MWYiLCJlbWFpbCI6InNpbWVuLmtyaXN0b2ZmZXJzZW45OEBnbWFpbC5jb20iLCJwZXJtaXNzaW9ucyI6WyJVU0VSIiwiQURNSU4iXSwibWVtYmVyIjp7Im5hbWUiOnsiZmlyc3QiOiJTaW1lbiIsImxhc3QiOiJLcmlzdG9mZmVyc2VuIn0sInJvbGUiOm51bGwsIl9pZCI6ImQwMzNlMjJhZTM0OGFlYjU2NjBmYzIxNCIsImVtYWlsIjoic2ltZW4ua3Jpc3RvZmZlcnNlbjk4QGdtYWlsLmNvbSIsInBob25lIjoiOTAzNjA5MjIiLCJpbWFnZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9wcm94eS9wakp2UThTSnBMNktvZmZYOTJaQmcwT0J0MUt1WFBjSjhSNVNzR192UjFiMXBTY091cWtGMm1ibVRkaHJFR1Z3SkJ3QjN6VExmY1pCWDUyeUtqZ3J3R2w5dGk4ZEF2UURKLWZHOGF2RzI0VXJ2dk9rWXUwU2txejdpeDJ1aThNM05TU2ZoUVNHWEEyR1JJTU5nVWR4Z2ppdk5YNVR2T05qZjFrN1BCd3RkMWFudlpTRFUxN0pOS2pQd3NGQVF3IiwiX3YiOjAsImNyZWF0ZWRBdCI6IjIwMjEtMDEtMjFUMTQ6NTQ6NTcuNzEwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDEtMjFUMTQ6NTQ6NTcuNzEwWiJ9fSwiaWF0IjoxNjExMjYxNDQ2NjAwLCJleHAiOjE2MTEzNDc4NDY2MDB9.HMWXvSa5Y3xe6pZG1CNKd5r4-8XpWpQ4UQ_0h1lxj1U';

export const signedOutState: AuthState = {
  _id: null,
  email: null,
  permissions: null,
  member: null,
  token: null,
  isLoggedIn: false,
  loginFailed: false,
  loggingIn: false,
  errors: [],
};

export const signedInState: AuthState = {
  _id: authUser['_id'],
  email: authUser['email'],
  permissions: authUser['permissions'],
  member: authUser['member'],
  token: authToken,
  isLoggedIn: true,
  loginFailed: false,
  loggingIn: false,
  errors: [],
};

export default {
  authLogin,
  authUser,
  authToken,
  signedOutState,
  signedInState,
};
