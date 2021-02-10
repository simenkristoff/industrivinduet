import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState, MemberEntity } from '@/types';

import { logout } from '@/state/ducks/auth/actions';
import { Header } from '@/components/Header';

interface HeaderProps {
  isAdminNamespace: boolean;
  isLoggedIn: boolean;
  member: MemberEntity | null;
}

export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const [isAdminNamespace, setIsAdminNamespace] = useState(false);
  const stateToProps: HeaderProps = useSelector(({ auth }: IApplicationState) => ({
    isAdminNamespace: isAdminNamespace,
    isLoggedIn: auth.isLoggedIn,
    member: auth.member,
  }));

  useEffect(() => {
    const path = location.pathname;
    const regex = /^\/admin{1}/;

    if (stateToProps.isLoggedIn) {
      if (regex.test(path)) {
        setIsAdminNamespace(true);
      } else {
        setIsAdminNamespace(false);
      }
    }
  }, [location, stateToProps.isLoggedIn]);

  const dispatchToProps = {
    logout: useCallback(() => dispatch(logout()), [dispatch]),
  };

  return <Header {...stateToProps} {...dispatchToProps} />;
};
