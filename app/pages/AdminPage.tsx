import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MediaContainer } from '@/containers/MediaContainer';
import { OptionContainer } from '@/containers/OptionContainer';
import {
  ContentContainer,
  StudyFieldContainer,
  PartnerContainer,
  GroupContainer,
  RoleContainer,
  MemberContainer,
  EventContainer,
  JobContainer,
} from '@/containers/crud';

const AdminPage: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/admin'>
        <h1>Hello world</h1>
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

export default AdminPage;
