import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { RoleEntity, RoleState } from '@/state/ducks/role/types';
import {
  createRole,
  deleteRole,
  fetchRoles,
  setRole,
  updateRole,
} from '@/state/ducks/role/actions';
import { ColumnsType } from 'antd/lib/table';
import { RoleForm } from '@/components/forms';
import { fetchGroups } from '@/state/ducks/group/actions';
import { GroupEntity } from '@/state/ducks/group/types';

import { CrudContainer } from './CrudContainer';

export const RoleContainer: React.FC = () => {
  const dispatch = useDispatch();
  const roleState: RoleState = useSelector(({ role }: IApplicationState) => ({
    byId: role.byId,
    data: role.data,
    loading: role.loading,
    errors: role.errors,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchRoles()), [dispatch]),
    create: useCallback((role) => dispatch(createRole(role)), [dispatch]),
    update: useCallback((role) => dispatch(updateRole(role)), [dispatch]),
    remove: useCallback((role) => dispatch(deleteRole(role)), [dispatch]),
    set: useCallback((role) => dispatch(setRole(role)), [dispatch]),
    dependencies: { getGroups: useCallback(() => dispatch(fetchGroups()), [dispatch]) },
  };

  const columns: ColumnsType<RoleEntity> = [
    {
      title: 'Stillingsnavn',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gruppe',
      dataIndex: 'group',
      key: 'group',
      align: 'center',
      sorter: (a, b) => {
        const c = a.group?.name || '';
        const d = b.group?.name || '';

        return c.localeCompare(d, 'nb');
      },
      render: (record?: GroupEntity) => (record ? record.name : ''),
    },
  ];

  const stateToProps = {
    state: roleState,
    columns,
    name: {
      singular: 'Stilling',
      plural: 'Stillinger',
    },
    dataForm: RoleForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
