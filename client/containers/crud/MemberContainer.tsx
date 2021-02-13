import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table';

import { IApplicationState, MemberEntity, MemberState, GroupEntity, RoleEntity } from '@/types';
import { MemberForm } from '@/components/forms';
import {
  createMember,
  deleteMember,
  fetchMembers,
  setMember,
  updateMember,
} from '@/state/ducks/member/actions';
import { fetchRoles } from '@/state/ducks/role/actions';

import { CrudContainer } from './CrudContainer';

export const MemberContainer: React.FC = () => {
  const dispatch = useDispatch();
  const memberState: MemberState = useSelector(({ member }: IApplicationState) => ({
    byId: member.byId,
    data: member.data,
    loading: member.loading,
    errors: member.errors,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchMembers()), [dispatch]),
    create: useCallback((member) => dispatch(createMember(member)), [dispatch]),
    update: useCallback((member) => dispatch(updateMember(member)), [dispatch]),
    remove: useCallback((member) => dispatch(deleteMember(member)), [dispatch]),
    set: useCallback((member) => dispatch(setMember(member)), [dispatch]),
    dependencies: { getRoles: useCallback(() => dispatch(fetchRoles()), [dispatch]) },
  };

  const columns: ColumnsType<MemberEntity> = [
    {
      title: 'Navn',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.first.localeCompare(b.name.first, 'nb'),
      render: (record) => `${record.first} ${record.last}`,
    },
    {
      title: 'Stilling',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      sorter: (a, b) => {
        const c = a.role?.name || '';
        const d = b.role?.name || '';

        return c.localeCompare(d, 'nb');
      },
      render: (record?: RoleEntity) => (record ? record.name : ''),
    },
    {
      title: 'Gruppe',
      dataIndex: ['role', 'group'],
      key: 'group',
      align: 'center',
      sorter: (a, b) => {
        const c = a.role?.group?.name || '';
        const d = b.role?.group?.name || '';

        return c.localeCompare(d, 'nb');
      },
      render: (record?: GroupEntity) => (record ? record.name : ''),
    },
  ];

  const stateToProps = {
    state: memberState,
    columns,
    name: {
      singular: 'Medlem',
      plural: 'Medlemmer',
    },
    dataForm: MemberForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
