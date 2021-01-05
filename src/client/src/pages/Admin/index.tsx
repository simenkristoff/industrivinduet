import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import { EventTable, JobTable, MemberTable, RoleTable, GroupTable } from '../../containers/Tables';
import Options from '../../containers/Options';

const Admin = () => {
  return (
    <Switch>
      <Route exact path='/admin'>
        Admin page
      </Route>

      <Route path='/admin/arrangementer'>
        <EventTable />
      </Route>

      <Route path='/admin/stillingsannonser'>
        <JobTable />
      </Route>

      <Route path='/admin/medlemmer'>
        <MemberTable />
      </Route>

      <Route path='/admin/stillinger'>
        <RoleTable />
      </Route>

      <Route path='/admin/grupper'>
        <GroupTable />
      </Route>

      <Route path='/admin/innstillinger'>
        <Options />
      </Route>
    </Switch>
  );
};

export default Admin;
