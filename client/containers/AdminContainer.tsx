import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  IApplicationState,
  AuthState,
  EventEntity,
  JobEntity,
  MemberEntity,
  UserEntity,
  UserPermissions,
} from '@/types';

import { AdminLanding } from '@/components/AdminLanding';
import { fetchMembers } from '@/state/ducks/member/actions';
import { fetchRoles } from '@/state/ducks/role/actions';
import { fetchActiveEvents } from '@/state/ducks/event/actions';
import { fetchActiveJobs } from '@/state/ducks/job/actions';
import { fetchUsers } from '@/state/ducks/user/actions';
import { checkUserIsAdmin } from '@/state/ducks/auth/helpers';

export const AdminContainer = () => {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const currentUser: AuthState = useSelector(({ auth }: IApplicationState) => auth);
  const users: UserEntity[] = useSelector(({ user }: IApplicationState) => user.data);
  const members: MemberEntity[] = useSelector(({ member }: IApplicationState) => member.data);
  const roleCount: number = useSelector(({ role }: IApplicationState) => role.data.length);
  const events: EventEntity[] = useSelector(({ event }: IApplicationState) => event.data);
  const jobs: JobEntity[] = useSelector(({ job }: IApplicationState) => job.data);

  useEffect(() => {
    setIsAdmin(checkUserIsAdmin(currentUser));
  }, []);

  function getLeaders(): MemberEntity[] {
    return _.filter(members, (member) => member.role?.roleType === 'Leder');
  }

  function getNonOccupied(): MemberEntity[] {
    return _.filter(members, (member) => member.role === undefined || member.role === null);
  }

  function getAdmins(): UserEntity[] {
    return _.filter(users, (user) => user.permissions === UserPermissions.ADMIN);
  }

  const stateToProps = {
    isAdmin,
    leaders: getLeaders(),
    nonOccupied: getNonOccupied(),
    memberCount: members.length,
    userCount: users.length,
    adminCount: getAdmins().length,
    roleCount,
    events,
    jobs,
  };

  const dispatchToProps = {
    fetchMembers: useCallback(() => dispatch(fetchMembers()), [dispatch]),
    fetchRoles: useCallback(() => dispatch(fetchRoles()), [dispatch]),
    fetchUsers: useCallback(() => dispatch(fetchUsers()), [dispatch]),
    fetchEvents: useCallback(() => dispatch(fetchActiveEvents(2)), [dispatch]),
    fetchJobs: useCallback(() => dispatch(fetchActiveJobs(2)), [dispatch]),
  };

  return <AdminLanding {...stateToProps} {...dispatchToProps} />;
};
