import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import {
  IApplicationState,
  OptionState,
  EventState,
  JobState,
  PartnerState,
  EventOptions,
  JobOptions,
} from '@/types';
import { fetchActiveEvents } from '@/state/ducks/event/actions';
import { fetchActiveJobs } from '@/state/ducks/job/actions';
import { fetchPartners } from '@/state/ducks/partner/actions';
import { Frontpage } from '@/components/Frontpage';

export const FrontpageContainer = () => {
  const dispatch = useDispatch();
  const options: OptionState = useSelector(({ options }: IApplicationState) => options);
  const eventState: EventState = useSelector(({ event }: IApplicationState) => event);
  const jobState: JobState = useSelector(({ job }: IApplicationState) => job);
  const partnerState: PartnerState = useSelector(({ partner }: IApplicationState) => partner);

  useEffect(() => {
    if (!options.loading && !_.isEmpty(options)) {
      if ((options.event as EventOptions).homepage.displayEvents) {
        dispatch(fetchActiveEvents((options.event as EventOptions).homepage.numberOfEvents));
      }
      if ((options.job as JobOptions).homepage.displayJobs) {
        dispatch(fetchActiveJobs((options.job as JobOptions).homepage.numberOfJobs));
      }
      dispatch(fetchPartners());
    }
  }, []);

  const eventProps = {
    data: eventState.data,
    display: (options.event as EventOptions).homepage.displayEvents,
    loading: eventState.loading,
    colSize: Math.floor(24 / (options.event as EventOptions).homepage.numberOfEvents),
  };

  const jobProps = {
    data: jobState.data,
    display: (options.job as JobOptions).homepage.displayJobs,
    loading: jobState.loading,
  };

  const partnerProps = {
    data: partnerState.data,
    loading: partnerState.loading,
  };

  const stateToProps = {
    generalOptions: options.general,
    events: eventProps,
    jobs: jobProps,
    partners: partnerProps,
  };

  return <Frontpage {...stateToProps} />;
};
