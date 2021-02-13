import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IApplicationState, ForgotPasswordCredentials } from '@/types';
import { clear, forgot } from '@/state/ducks/auth/actions';
import { ForgotPassword } from '@/components/auth';

export const ForgotPasswordContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, loading, status } = useSelector(({ auth }: IApplicationState) => auth);

  useEffect(() => {
    return () => {
      dispatch(clear());
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/admin');
    }
  }, [isLoggedIn, location]);

  const stateToProps = {
    loading,
    response: status,
  };

  const dispatchToProps = {
    forgot: useCallback((credentials: ForgotPasswordCredentials) => dispatch(forgot(credentials)), [
      dispatch,
    ]),
  };

  return <ForgotPassword {...stateToProps} {...dispatchToProps} />;
};
