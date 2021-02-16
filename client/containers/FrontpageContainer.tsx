import React, { useEffect, useState } from 'react';
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
import { fetchOptions } from '@/state/ducks/option/actions';

export const FrontpageContainer = () => {
  const dispatch = useDispatch();
  const [displayEvents, setDisplayEvents] = useState<boolean>(false);
  const [numEvents, setNumEvents] = useState<number>(0);
  const [displayJobs, setDisplayJobs] = useState<boolean>(false);
  const [numJobs, setNumJobs] = useState<number>(0);
  const options: OptionState = useSelector(({ options }: IApplicationState) => options);
  const eventState: EventState = useSelector(({ event }: IApplicationState) => event);
  const jobState: JobState = useSelector(({ job }: IApplicationState) => job);
  const partnerState: PartnerState = useSelector(({ partner }: IApplicationState) => partner);

  useEffect(() => {
    dispatch(fetchOptions());
    handleFetchEvents();
    handleFetchJobs();
    dispatch(fetchPartners());
  }, []);

  useEffect(() => {
    handleFetchEvents();
    handleFetchJobs();
  }, [displayEvents, numEvents, displayJobs, numJobs]);

  useEffect(() => {
    if (!_.isEmpty(options.event)) {
      var eventOptions = (options.event as EventOptions).homepage;
      setDisplayEvents(eventOptions.displayEvents);
      setNumEvents(eventOptions.numberOfEvents);
    }
    if (!_.isEmpty(options.job)) {
      var jobOptions = (options.job as JobOptions).homepage;
      setDisplayJobs(jobOptions.displayJobs);
      setNumJobs(jobOptions.numberOfJobs);
    }
  }, [options]);

  const handleFetchEvents = () => {
    if (displayEvents && numEvents > 0) {
      dispatch(fetchActiveEvents(numEvents));
    }
  };

  const handleFetchJobs = () => {
    if (displayJobs && numJobs > 0) {
      dispatch(fetchActiveJobs(numJobs));
    }
  };

  const eventProps = {
    data: eventState.data,
    display: displayEvents,
    loading: eventState.loading,
    colSize: Math.floor(24 / numEvents),
  };

  const jobProps = {
    data: jobState.data,
    display: displayJobs,
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
