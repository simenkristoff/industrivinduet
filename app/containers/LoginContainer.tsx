import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { login } from '@/state/ducks/auth/actions';
import { Login } from '@/components/Login';
import { LoginCredentials } from '@/state/ducks/auth/types';

export const LoginContainer = () => {
  const dispatch = useDispatch();

  const stateToProps = useSelector(({ auth }: IApplicationState) => ({
    errors: auth.errors,
  }));

  const dispatchToProps = {
    login: useCallback((credentials: LoginCredentials) => dispatch(login(credentials)), [dispatch]),
  };

  return <Login {...stateToProps} {...dispatchToProps} />;
};
