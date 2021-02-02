import React, { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { AuthState } from '@/state/ducks/auth/types';
import { fetchMembers } from '@/state/ducks/member/actions';
import { fetchRoles } from '@/state/ducks/role/actions';
import { fetchActiveEvents } from '@/state/ducks/event/actions';
import { fetchActiveJobs } from '@/state/ducks/job/actions';
import { EventEntity } from '@/state/ducks/event/types';
import { JobEntity } from '@/state/ducks/job/types';
import { AdminLanding } from '@/components/AdminLanding';
import { MemberEntity } from '@/state/ducks/member/types';

export const AdminContainer = () => {
  const dispatch = useDispatch();
  const { ...currentUser }: AuthState = useSelector(({ auth }: IApplicationState) => auth);
  const members: MemberEntity[] = useSelector(({ member }: IApplicationState) => member.data);
  const roleCount: number = useSelector(({ role }: IApplicationState) => role.data.length);
  const events: EventEntity[] = useSelector(({ event }: IApplicationState) => event.data);
  const jobs: JobEntity[] = useSelector(({ job }: IApplicationState) => job.data);

  function getLeaders(): MemberEntity[] {
    return _.filter(members, (member) => member.role?.roleType === 'Leder');
  }

  function getNonOccupied(): MemberEntity[] {
    return _.filter(members, (member) => member.role === undefined || member.role === null);
  }

  const stateToProps = {
    leaders: getLeaders(),
    nonOccupied: getNonOccupied(),
    memberCount: members.length,
    roleCount,
    events,
    jobs,
  };

  const dispatchToProps = {
    fetchMembers: useCallback(() => dispatch(fetchMembers()), [dispatch]),
    fetchRoles: useCallback(() => dispatch(fetchRoles()), [dispatch]),
    fetchEvents: useCallback(() => dispatch(fetchActiveEvents(2)), [dispatch]),
    fetchJobs: useCallback(() => dispatch(fetchActiveJobs(2)), [dispatch]),
  };

  return <AdminLanding {...stateToProps} {...dispatchToProps} />;
};
