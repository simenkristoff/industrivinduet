import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table';

import { IApplicationState, GroupEntity, GroupState } from '@/types';
import { GroupForm } from '@/components/forms';
import {
  createGroup,
  deleteGroup,
  fetchGroups,
  setGroup,
  updateGroup,
} from '@/state/ducks/group/actions';

import { CrudContainer } from './CrudContainer';

export const GroupContainer: React.FC = () => {
  const dispatch = useDispatch();
  const groupState: GroupState = useSelector(({ group }: IApplicationState) => ({
    byId: group.byId,
    data: group.data,
    loading: group.loading,
    status: group.status,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchGroups()), [dispatch]),
    create: useCallback((group) => dispatch(createGroup(group)), [dispatch]),
    update: useCallback((group) => dispatch(updateGroup(group)), [dispatch]),
    remove: useCallback((group) => dispatch(deleteGroup(group)), [dispatch]),
    set: useCallback((group) => dispatch(setGroup(group)), [dispatch]),
  };

  const columns: ColumnsType<GroupEntity> = [
    {
      title: 'Gruppenavn',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
    },
  ];

  const stateToProps = {
    state: groupState,
    columns,
    name: {
      singular: 'Gruppe',
      plural: 'Grupper',
    },
    dataForm: GroupForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
