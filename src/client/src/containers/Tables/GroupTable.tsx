import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroupStart, updateGroupStart, deleteGroupStart, fetchGroupsStart, setGroup } from '../../redux/Group/group.actions';
import { ColumnsType } from 'antd/lib/table';
import { getGroups } from '../../selectors';

// Types
import { Group } from '../../types';

// Components
import GroupForm from '../Forms/GroupForm';
import DatabaseManager from '../../components/DatabaseManager';

const GroupTable = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector(getGroups);

  useEffect(() => {
    dispatch(fetchGroupsStart());
  }, []);

  const tableColumns: ColumnsType<Group> = [
    {
      title: 'Navn',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
    },
  ];

  const configDM = {
    name: {
      singular: 'Gruppes',
      plural: 'Gruppers',
    },
    data: groups,
    columns: tableColumns,
    component: GroupForm,
    updateObject: updateGroupStart,
    addObject: addGroupStart,
    deleteObject: deleteGroupStart,
    setObject: setGroup,
  };

  return <DatabaseManager<Group> {...configDM} />;
};

export default GroupTable;
