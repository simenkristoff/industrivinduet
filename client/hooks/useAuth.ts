import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IApplicationState, AuthState } from '@/types';

const useAuth = () => {
  const history = useHistory();
  const { ...currentUser }: AuthState = useSelector(({ auth }: IApplicationState) => auth);

  const verifyAuth = (user: AuthState): Boolean => {
    if (!currentUser) {
      return false;
    }

    if (currentUser.token) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!verifyAuth(currentUser)) {
      history.push('/logg_inn');
    }
  }, [currentUser, history]);

  return currentUser;
};

export default useAuth;
