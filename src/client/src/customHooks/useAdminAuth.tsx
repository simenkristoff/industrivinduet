import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkUserIsAdmin } from '../utils';

// Types
import { RootState } from '../types';

const mapState = ({ user }: RootState) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = (props: any) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push('/logg_inn');
    }
  }, [currentUser, history]);

  return currentUser;
};

export default useAdminAuth;
