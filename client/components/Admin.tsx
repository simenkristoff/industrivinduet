import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AdminContainer } from '@/containers/AdminContainer';
import { MediaContainer } from '@/containers/MediaContainer';
import { OptionContainer } from '@/containers/OptionContainer';
import {
  UserContainer,
  ContentContainer,
  StudyFieldContainer,
  PartnerContainer,
  GroupContainer,
  RoleContainer,
  MemberContainer,
  EventContainer,
  JobContainer,
} from '@/containers/crud';

export const Admin: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/admin'>
        <AdminContainer />
      </Route>
      <Route exact path='/admin/brukere'>
        <UserContainer />
      </Route>
      <Route path='/admin/arrangementer'>
        <EventContainer />
      </Route>
      <Route path='/admin/stillingsannonser'>
        <JobContainer />
      </Route>
      <Route path='/admin/sider'>
        <ContentContainer />
      </Route>
      <Route path='/admin/media'>
        <MediaContainer />
      </Route>
      <Route path='/admin/studieretninger'>
        <StudyFieldContainer />
      </Route>
      <Route path='/admin/samarbeidspartnere'>
        <PartnerContainer />
      </Route>
      <Route path='/admin/medlemmer'>
        <MemberContainer />
      </Route>
      <Route path='/admin/stillinger'>
        <RoleContainer />
      </Route>
      <Route path='/admin/grupper'>
        <GroupContainer />
      </Route>
      <Route path='/admin/innstillinger'>
        <OptionContainer />
      </Route>
    </Switch>
  );
};
