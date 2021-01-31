import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { register } from '@/state/ducks/auth/actions';
import { Register } from '@/components/Register';
import { RegisterCredentials } from '@/state/ducks/auth/types';

export const RegisterContainer = () => {
  const dispatch = useDispatch();

  const stateToProps = useSelector(({ auth }: IApplicationState) => ({
    errors: auth.errors,
  }));

  const dispatchToProps = {
    register: useCallback((credentials: RegisterCredentials) => dispatch(register(credentials)), [
      dispatch,
    ]),
  };

  return <Register {...stateToProps} {...dispatchToProps} />;
};
