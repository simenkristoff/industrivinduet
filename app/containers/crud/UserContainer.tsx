import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { UserEntity, UserState } from '@/state/ducks/user/types';
import {
  createUser,
  deleteUser,
  fetchUsers,
  setUser,
  updateUser,
} from '@/state/ducks/user/actions';
import { ColumnsType } from 'antd/lib/table';
import { UserForm } from '@/components/forms';

import { CrudContainer } from './CrudContainer';

export const UserContainer: React.FC = () => {
  const dispatch = useDispatch();
  const userState: UserState = useSelector(({ user }: IApplicationState) => ({
    byId: user.byId,
    data: user.data,
    loading: user.loading,
    errors: user.errors,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchUsers()), [dispatch]),
    create: useCallback((user) => dispatch(createUser(user)), [dispatch]),
    update: useCallback((user) => dispatch(updateUser(user)), [dispatch]),
    remove: useCallback((user) => dispatch(deleteUser(user)), [dispatch]),
    set: useCallback((user) => dispatch(setUser(user)), [dispatch]),
  };

  const columns: ColumnsType<UserEntity> = [
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email, 'nb'),
    },
    {
      title: 'Tillatelser',
      dataIndex: 'permissions',
      key: 'permissions',
      sorter: (a, b) => a.permissions.localeCompare(b.permissions, 'nb'),
    },
  ];

  const stateToProps = {
    state: userState,
    columns,
    name: {
      singular: 'Bruker',
      plural: 'Brukere',
    },
    dataForm: UserForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};