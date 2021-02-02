import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { OptionState } from '@/state/ducks/option/types';
import { fetchOptions } from '@/state/ducks/option/actions';
import { IApplicationState } from '@/types';
import { AdminLayout, MainLayout } from '@/layouts';
import { FrontpageContainer } from '@/containers/FrontpageContainer';
import { LoginContainer } from '@/containers/LoginContainer';
import { RegisterContainer } from '@/containers/RegisterContainer';
import { EventResultContainer } from '@/containers/EventResultContainer';
import { EventSingleContainer } from '@/containers/EventSingleContainer';
import { JobResultContainer } from '@/containers/JobResultContainer';
import { JobSingleContainer } from '@/containers/JobSingleContainer';
import { AboutUsContainer } from '@/containers/AboutUsContainer';
import { ContactContainer } from '@/containers/ContactContainer';
import { Admin } from '@/components/Admin';

import '@/sass/App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const options: OptionState = useSelector(({ options }: IApplicationState) => options);
  useEffect(() => {
    dispatch(fetchOptions());
  }, []);

  return (
    <div id='App'>
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <MainLayout>
              <FrontpageContainer />
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/arrangementer'
          render={() => (
            <MainLayout>
              <EventResultContainer />
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/arrangementer/:eventID'
          render={() => (
            <MainLayout>
              <EventSingleContainer />
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/stillingsannonser'
          render={() => (
            <MainLayout>
              <JobResultContainer />
            </MainLayout>
          )}
        />
        <Route
          exact
          path='/stillingsannonser/:jobID'
          render={() => (
            <MainLayout>
              <JobSingleContainer />
            </MainLayout>
          )}
        />
        <Route
          path='/om_oss'
          render={() => (
            <MainLayout>
              <AboutUsContainer />
            </MainLayout>
          )}
        />
        <Route
          path='/kontakt'
          render={() => (
            <MainLayout>
              <ContactContainer />
            </MainLayout>
          )}
        />
        <Route
          path='/logg_inn'
          render={() => (
            <MainLayout>
              <LoginContainer />
            </MainLayout>
          )}
        />
        <Route
          path='/registrer'
          render={() => (
            <MainLayout>
              <RegisterContainer />
            </MainLayout>
          )}
        />
        <Route
          path='/admin'
          render={() => (
            <AdminLayout>
              <Admin />
            </AdminLayout>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
