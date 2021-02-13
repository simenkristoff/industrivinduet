import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { IApplicationState, RegisterCredentials, ApiResponse } from '@/types';
import { clear, register } from '@/state/ducks/auth/actions';
import { lookupRegisterToken } from '@/state/ducks/user/actions';
import { Register } from '@/components/auth';

type ParamTypes = {
  token: string;
};

export const RegisterContainer = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useParams<ParamTypes>();

  const { isLoggedIn, loading, status } = useSelector(({ auth }: IApplicationState) => auth);
  const user = useSelector(({ user }: IApplicationState) => user);

  useEffect(() => {
    if (status) {
      setResponse(status);
    } else if (user.status) {
      setResponse(user.status);
    } else {
      setResponse(null);
    }
  }, [status, user.status]);

  useEffect(() => {
    dispatch(lookupRegisterToken({ token }));

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
    user: user.byId,
    loading,
    response,
  };

  const dispatchToProps = {
    register: useCallback((credentials: RegisterCredentials) => dispatch(register(credentials)), [
      dispatch,
    ]),
  };

  return <Register {...stateToProps} {...dispatchToProps} />;
};
