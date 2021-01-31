import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AdminPage } from '@/pages';
import { AdminLayout, MainLayout } from '@/layouts';
import { AboutUsContainer } from '@/containers/AboutUsContainer';
import { EventResultContainer } from '@/containers/EventResultContainer';
import { JobResultContainer } from '@/containers/JobResultContainer';
import { fetchOptions } from '@/state/ducks/option/actions';
import { LoginContainer } from '@/containers/LoginContainer';
import { OptionState } from '@/state/ducks/option/types';
import { IApplicationState } from '@/types';

import { FrontpageContainer } from './containers/FrontpageContainer';
import { EventSingleContainer } from './containers/EventSingleContainer';
import { JobSingleContainer } from './containers/JobSingleContainer';
import { ContactContainer } from './containers/ContactContainer';
import '@/sass/App.scss';
import { RegisterContainer } from './containers/RegisterContainer';

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
              <AdminPage />
            </AdminLayout>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
