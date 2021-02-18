import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import {
  IApplicationState,
  AuthState,
  UserState,
  MemberState,
  EventState,
  JobState,
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

/**
 * Container for AdminLanding component. Displays
 * system data.
 */
export const AdminContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const currentUser: AuthState = useSelector(({ auth }: IApplicationState) => auth);
  const userState: UserState = useSelector(({ user }: IApplicationState) => user);
  const memberState: MemberState = useSelector(({ member }: IApplicationState) => member);
  const roleCount: number = useSelector(({ role }: IApplicationState) => role.data.length);
  const eventState: EventState = useSelector(({ event }: IApplicationState) => event);
  const jobState: JobState = useSelector(({ job }: IApplicationState) => job);

  useEffect(() => {
    setLoading(
      currentUser.loading ||
        userState.loading ||
        memberState.loading ||
        eventState.loading ||
        jobState.loading,
    );
  }, [
    currentUser.loading,
    userState.loading,
    memberState.loading,
    eventState.loading,
    jobState.loading,
  ]);

  useEffect(() => {
    setIsAdmin(checkUserIsAdmin(currentUser));
  }, []);

  function getLeaders(): MemberEntity[] {
    return _.filter(memberState.data, (member) => member.role?.roleType === 'Leder');
  }

  function getNonOccupied(): MemberEntity[] {
    return _.filter(
      memberState.data,
      (member) => member.role === undefined || member.role === null,
    );
  }

  function getAdmins(): UserEntity[] {
    return _.filter(userState.data, (user) => user.permissions === UserPermissions.ADMIN);
  }

  const stateToProps = {
    isAdmin,
    leaders: getLeaders(),
    nonOccupied: getNonOccupied(),
    memberCount: memberState.data.length,
    userCount: userState.data.length,
    adminCount: getAdmins().length,
    roleCount,
    events: eventState.data,
    jobs: jobState.data,
    loading,
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
