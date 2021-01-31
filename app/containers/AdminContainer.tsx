import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { AuthState } from '@/state/ducks/auth/types';
import { register, login, logout } from '@/state/ducks/auth/actions';

export const AdminContainer = () => {
  const dispatch = useDispatch();
  const { ...currentUser }: AuthState = useSelector(({ auth }: IApplicationState) => auth);

  const dispatchToProps = {
    register: useCallback((user) => dispatch(register(user)), [dispatch]),
    login: useCallback((credentials) => dispatch(login(credentials)), [dispatch]),
    logout: useCallback(() => dispatch(logout()), [dispatch]),
  };

  return <div></div>;
};
