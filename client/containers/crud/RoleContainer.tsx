import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table';

import { IApplicationState, RoleEntity, RoleState, GroupEntity, CollectionKeys } from '@/types';
import { RoleForm } from '@/components/forms';
import {
  createRole,
  deleteRole,
  fetchRoles,
  setRole,
  updateRole,
} from '@/state/ducks/role/actions';
import { fetchGroups } from '@/state/ducks/group/actions';

import { CrudContainer } from './CrudContainer';

/**
 * Setup Crud-management for Role Entities
 */
export const RoleContainer: React.FC = () => {
  const dispatch = useDispatch();
  const roleState: RoleState = useSelector(({ role }: IApplicationState) => ({
    byId: role.byId,
    data: role.data,
    loading: role.loading,
    status: role.status,
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
      sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
    },
    {
      title: 'Gruppe',
      className: 'hide-sm',
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

  const collection: CollectionKeys = 'ROLE';

  const stateToProps = {
    state: roleState,
    columns,
    name: {
      singular: 'Stilling',
      plural: 'Stillinger',
    },
    collection,
    dataForm: RoleForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
