import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { GroupEntity, GroupState } from '@/state/ducks/group/types';
import {
  createGroup,
  deleteGroup,
  fetchGroups,
  setGroup,
  updateGroup,
} from '@/state/ducks/group/actions';
import { ColumnsType } from 'antd/lib/table';
import { GroupForm } from '@/components/forms';

import CrudContainer from './CrudContainer';

const GroupContainer: React.FC = () => {
  const dispatch = useDispatch();
  const groupState: GroupState = useSelector(({ group }: IApplicationState) => ({
    byId: group.byId,
    data: group.data,
    loading: group.loading,
    errors: group.errors,
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

export default GroupContainer;
