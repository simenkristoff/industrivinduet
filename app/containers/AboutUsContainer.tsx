import React, { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/state/interface';
import { fetchContents } from '@/state/ducks/content/actions';
import { MemberEntity } from '@/state/ducks/member/types';
import { fetchMembers } from '@/state/ducks/member/actions';
import { AboutUs } from '@/components/AboutUs';
import { roleValuesEnum } from '@/constants';

type groupType = {
  [key: string]: MemberEntity[];
};

export const AboutUsContainer = () => {
  const dispatch = useDispatch();
  const membersData: MemberEntity[] = useSelector(({ member }: IApplicationState) => member.data);

  function sortMembers(): MemberEntity[] {
    console.log('sorting');
    const groups: groupType = {};
    const uniqueGroups = _.uniq(
      membersData
        .flatMap((o) => o.role)
        .flatMap((p) => p?.group)
        .flatMap((q) => (q?.name ? q.name : 'Leader')),
    );
    _.forEach(uniqueGroups, (group) => {
      groups[group] = [];
    });
    _.orderBy(
      membersData,
      (member) => {
        const val = member.role?.roleType ? roleValuesEnum[member.role?.roleType] : 0;

        return val;
      },
      ['asc'],
    ).map((member) => {
      const group = member.role?.group?.name ? member.role.group.name : 'Leader';
      groups[group].push(member);
    });
    const sortedMembers: any[] = [];
    Object.keys(groups).map((key) => {
      sortedMembers.push(...groups[key]);
    });

    return sortedMembers;
  }

  const stateToProps = useSelector(({ content }: IApplicationState) => ({
    data: content.data,
    members: sortMembers(),
  }));

  const dispatchToProps = {
    fetchContents: useCallback(() => dispatch(fetchContents()), [dispatch]),
    fetchMembers: useCallback(() => dispatch(fetchMembers()), [dispatch]),
  };

  return <AboutUs {...stateToProps} {...dispatchToProps} />;
};
