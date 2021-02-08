import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IApplicationState } from '@/types';
import { register } from '@/state/ducks/auth/actions';
import { Register } from '@/components/Register';
import { RegisterCredentials } from '@/state/ducks/auth/types';

export const RegisterContainer = () => {
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
    register: useCallback((credentials: RegisterCredentials) => dispatch(register(credentials)), [
      dispatch,
    ]),
  };

  return <Register {...stateToProps} {...dispatchToProps} />;
};
