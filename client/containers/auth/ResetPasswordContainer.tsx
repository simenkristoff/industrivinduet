import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { IApplicationState, ResetPasswordCredentials } from '@/types';
import { clear, reset } from '@/state/ducks/auth/actions';
import { ResetPassword } from '@/components/auth';

type ParamTypes = {
  token: string;
};

/**
 * Container for ResetPassword component. Dispatches a
 * reset password request to the api.
 * Will not render if the user is already logged in.
 */
export const ResetPasswordContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams<ParamTypes>();

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
    token,
  };

  const dispatchToProps = {
    reset: useCallback((credentials: ResetPasswordCredentials) => dispatch(reset(credentials)), [
      dispatch,
    ]),
  };

  return <ResetPassword {...stateToProps} {...dispatchToProps} />;
};
