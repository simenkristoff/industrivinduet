import React from 'react';
import {Switch, Route} from 'react-router-dom'; 

// Components
import Event from './../../components/admin/Event';
import Job from './../../components/admin/Job';
import Member from './../../components/admin/Member';
import Role from './../../components/admin/Role';
import Group from './../../components/admin/Group';

const Admin = () => {
    return (
        <Switch>
            <Route exact path="/admin">Admin page</Route>

            <Route path="/admin/arrangementer">
                <Event />
            </Route>

            <Route path="/admin/stillingsannonser">
                <Job />
            </Route>

            <Route path="/admin/medlemmer">
                <Member />
            </Route>

            <Route path="/admin/stillinger">
                <Role />
            </Route>

            <Route path="/admin/grupper">
                <Group />
            </Route>
        </Switch>
    );   
};

export default Admin;
