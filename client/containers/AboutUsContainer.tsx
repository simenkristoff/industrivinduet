import React, { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/state/interface';
import { fetchContents } from '@/state/ducks/content/actions';
import { MemberEntity } from '@/state/ducks/member/types';
import { fetchMembers } from '@/state/ducks/member/actions';
import { AboutUs } from '@/components/AboutUs';
import { roleValuesEnum } from '@/constants';
import { PartnerEntity } from '@/state/ducks/partner/types';
import { fetchPartners } from '@/state/ducks/partner/actions';

type groupType = {
  [key: string]: MemberEntity[];
};

export const AboutUsContainer = () => {
  const dispatch = useDispatch();
  const membersData: MemberEntity[] = useSelector(({ member }: IApplicationState) => member.data);
  const partnersData: PartnerEntity[] = useSelector(
    ({ partner }: IApplicationState) => partner.data,
  );

  function sortMembers(): MemberEntity[] {
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
    partners: partnersData,
  }));

  const dispatchToProps = {
    fetchContents: useCallback(() => dispatch(fetchContents()), [dispatch]),
    fetchMembers: useCallback(() => dispatch(fetchMembers()), [dispatch]),
    fetchPartners: useCallback(() => dispatch(fetchPartners()), [dispatch]),
  };

  return <AboutUs {...stateToProps} {...dispatchToProps} />;
};
