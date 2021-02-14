import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table';

import { IApplicationState, UserEntity, UserState, CollectionKeys } from '@/types';
import { UserForm } from '@/components/forms';
import {
  createUser,
  deleteUser,
  fetchUsers,
  setUser,
  updateUser,
} from '@/state/ducks/user/actions';
import { fetchMembers } from '@/state/ducks/member/actions';

import { CrudContainer } from './CrudContainer';

export const UserContainer: React.FC = () => {
  const dispatch = useDispatch();
  const userState: UserState = useSelector(({ user }: IApplicationState) => ({
    byId: user.byId,
    data: user.data,
    loading: user.loading,
    status: user.status,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchUsers()), [dispatch]),
    create: useCallback((user) => dispatch(createUser(user)), [dispatch]),
    update: useCallback((user) => dispatch(updateUser(user)), [dispatch]),
    remove: useCallback((user) => dispatch(deleteUser(user)), [dispatch]),
    set: useCallback((user) => dispatch(setUser(user)), [dispatch]),
    dependencies: { getMembers: useCallback(() => dispatch(fetchMembers()), [dispatch]) },
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
      className: 'hide-sm',
      dataIndex: 'permissions',
      key: 'permissions',
      sorter: (a, b) => a.permissions.localeCompare(b.permissions, 'nb'),
    },
    {
      title: 'Registrert',
      className: 'hide-sm',
      dataIndex: 'isRegistered',
      key: 'isRegistered',
      sorter: (a, b) => (a.isRegistered === b.isRegistered ? 0 : a.isRegistered ? -1 : 1),
      render: (record) => (record === true ? 'Registrert' : 'Ikke registrert'),
    },
  ];

  const collection: CollectionKeys = 'USER';

  const stateToProps = {
    state: userState,
    columns,
    name: {
      singular: 'Bruker',
      plural: 'Brukere',
    },
    collection,
    dataForm: UserForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
