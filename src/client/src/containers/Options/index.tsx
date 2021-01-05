import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { fetchOptionsStart, updateOptionStart } from '../../redux/Option/option.actions';

// Option components
import GeneralOptions from './GeneralOptions';
import EventOptions from './EventOptions';
import JobOptions from './JobOptions';
import SocialOptions from './SocialOptions';
import HomepageOptions from './HomepageOptions';
import OptionManager from '../../components/OptionManager';

const config = { onUpdate: updateOptionStart };

const Options = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/generelt`}>
        <GeneralOptions />
      </Route>
      <Route path={`${match.url}/forside`}>
        <OptionManager title={'Innstillinger for forsiden'} form={HomepageOptions} {...config} />
      </Route>
      <Route path={`${match.url}/profilering`}>
        <GeneralOptions />
      </Route>
      <Route path={`${match.url}/arrangementer`}>
        <EventOptions />
      </Route>
      <Route path={`${match.url}/stillingsannonser`}>
        <JobOptions />
      </Route>
      <Route path={`${match.url}/sosiale-medier`}>
        <SocialOptions />
      </Route>
    </Switch>
  );
};

export default Options;
