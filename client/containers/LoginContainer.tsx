import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IApplicationState } from '@/types';
import { login } from '@/state/ducks/auth/actions';
import { Login } from '@/components/Login';
import { LoginCredentials } from '@/state/ducks/auth/types';

export const LoginContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, errors } = useSelector(({ auth }: IApplicationState) => auth);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/admin');
    }
  }, [isLoggedIn, location]);

  const stateToProps = {
    errors,
  };

  const dispatchToProps = {
    login: useCallback((credentials: LoginCredentials) => dispatch(login(credentials)), [dispatch]),
  };

  return <Login {...stateToProps} {...dispatchToProps} />;
};
