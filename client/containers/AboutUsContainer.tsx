import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { IApplicationState, ContentState, MemberState, PartnerState, MemberEntity } from '@/types';
import { roleValuesEnum } from '@/constants';
import { AboutUs } from '@/components/AboutUs';
import { fetchContents } from '@/state/ducks/content/actions';
import { fetchMembers } from '@/state/ducks/member/actions';
import { fetchPartners } from '@/state/ducks/partner/actions';

type groupType = {
  [key: string]: MemberEntity[];
};

export const AboutUsContainer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const contents: ContentState = useSelector(({ content }: IApplicationState) => content);
  const members: MemberState = useSelector(({ member }: IApplicationState) => member);
  const partners: PartnerState = useSelector(({ partner }: IApplicationState) => partner);

  useEffect(() => {
    dispatch(fetchContents());
    dispatch(fetchMembers());
    dispatch(fetchPartners());
  }, []);

  useEffect(() => {
    setLoading(contents.loading || members.loading || partners.loading);
  }, [contents.loading, members.loading, partners.loading]);

  function sortMembers(): MemberEntity[] {
    const groups: groupType = {};
    const uniqueGroups = _.uniq(
      members.data
        .flatMap((o) => o.role)
        .flatMap((p) => p?.group)
        .flatMap((q) => (q?.name ? q.name : 'Leader')),
    );
    _.forEach(uniqueGroups, (group) => {
      groups[group] = [];
    });
    _.orderBy(
      members.data,
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

  const stateToProps = {
    data: contents.data,
    members: sortMembers(),
    partners: partners.data,
    loading,
  };

  return (
    <div className='about-us-wrapper'>
      <AboutUs {...stateToProps} />
    </div>
  );
};
