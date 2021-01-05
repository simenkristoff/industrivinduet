import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoleStart, updateRoleStart, deleteRoleStart, fetchRolesStart, setRole } from '../../redux/Role/role.actions';
import { ColumnsType } from 'antd/lib/table';
import { getRoles } from '../../selectors';

// Types
import { Role } from '../../types';

// Components
import RoleForm from '../Forms/RoleForm';
import DatabaseManager from '../../components/DatabaseManager';

const RoleTable = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector(getRoles);

  useEffect(() => {
    dispatch(fetchRolesStart());
  }, []);

  const tableColumns: ColumnsType<Role> = [
    {
      title: 'Navn',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
    },
    {
      title: 'Gruppe',
      dataIndex: 'group',
      key: 'group',
      align: 'center',
      sorter: (a, b) => a.group.name.localeCompare(b.group.name, 'nb'),
      render: (record) => record.name,
    },
  ];

  const configDM = {
    name: {
      singular: 'Stilling',
      plural: 'Stillinger',
    },
    data: roles,
    columns: tableColumns,
    component: RoleForm,
    updateObject: updateRoleStart,
    addObject: addRoleStart,
    deleteObject: deleteRoleStart,
    setObject: setRole,
  };

  return <DatabaseManager<Role> {...configDM} />;
};

export default RoleTable;
