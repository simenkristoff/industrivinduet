import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberStart, updateMemberStart, deleteMemberStart, fetchMembersStart, setMember } from '../../redux/Member/member.actions';
import { ColumnsType } from 'antd/lib/table';
import { getMembers } from '../../selectors';

// Types
import { Member } from '../../types';

// Components
import MemberForm from '../Forms/MemberForm';
import DatabaseManager from '../../components/DatabaseManager';

const MemberTable = () => {
  const dispatch = useDispatch();
  const { members } = useSelector(getMembers);

  useEffect(() => {
    dispatch(fetchMembersStart());
  }, []);

  const tableColumns: ColumnsType<Member> = [
    {
      title: 'Navn',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
    },
    {
      title: 'Gruppe',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      sorter: (a, b) => a.role.name.localeCompare(b.role.name, 'nb'),
      render: (record) => record.name,
    },
  ];

  const configDM = {
    name: {
      singular: 'Medlem',
      plural: 'Medlemmer',
    },
    data: members,
    columns: tableColumns,
    component: MemberForm,
    updateObject: updateMemberStart,
    addObject: addMemberStart,
    deleteObject: deleteMemberStart,
    setObject: setMember,
  };

  return <DatabaseManager<Member> {...configDM} />;
};

export default MemberTable;
