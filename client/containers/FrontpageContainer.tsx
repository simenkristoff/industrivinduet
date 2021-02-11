import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  IApplicationState,
  EventOptions,
  OptionState,
  EventEntity,
  JobEntity,
  PartnerEntity,
} from '@/types';

import { fetchActiveEvents } from '@/state/ducks/event/actions';
import { fetchActiveJobs } from '@/state/ducks/job/actions';
import { fetchPartners } from '@/state/ducks/partner/actions';
import { Frontpage } from '@/components/Frontpage';

export const FrontpageContainer = () => {
  const dispatch = useDispatch();
  const options: OptionState = useSelector(({ options }: IApplicationState) => options);
  const events: EventEntity[] = useSelector(({ event }: IApplicationState) => event.data);
  const jobs: JobEntity[] = useSelector(({ job }: IApplicationState) => job.data);
  const partners: PartnerEntity[] = useSelector(({ partner }: IApplicationState) => partner.data);
  const eventOptions = options.event as EventOptions;
  const stateToProps = {
    options,
    events,
    eventColSize: Math.floor(24 / eventOptions.homepage?.numberOfEvents),
    jobs,
    partners,
  };

  const dispatchToProps = {
    fetchEvents: useCallback((limit: number) => dispatch(fetchActiveEvents(limit)), [dispatch]),
    fetchJobs: useCallback((limit: number) => dispatch(fetchActiveJobs(limit)), [dispatch]),
    fetchPartners: useCallback(() => dispatch(fetchPartners()), [dispatch]),
  };

  return <Frontpage {...stateToProps} {...dispatchToProps} />;
};
