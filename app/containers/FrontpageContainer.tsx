import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '@/types';
import { OptionState } from '@/state/ducks/option/types';
import { fetchEvents } from '@/state/ducks/event/actions';
import { fetchJobs } from '@/state/ducks/job/actions';
import { fetchPartners } from '@/state/ducks/partner/actions';
import { EventEntity } from '@/state/ducks/event/types';
import { JobEntity } from '@/state/ducks/job/types';
import { PartnerEntity } from '@/state/ducks/partner/types';
import { Frontpage } from '@/components/Frontpage';

export const FrontpageContainer = () => {
  const dispatch = useDispatch();
  const options: OptionState = useSelector(({ options }: IApplicationState) => options);
  const events: EventEntity[] = useSelector(({ event }: IApplicationState) => event.data);
  const jobs: JobEntity[] = useSelector(({ job }: IApplicationState) => job.data);
  const partners: PartnerEntity[] = useSelector(({ partner }: IApplicationState) => partner.data);

  const stateToProps = {
    options,
    events,
    eventColSize: Math.floor(24 / options.event.homepage?.numberOfEvents),
    jobs,
    partners,
  };

  const dispatchToProps = {
    fetchEvents: useCallback((limit: number) => dispatch(fetchEvents(limit)), [dispatch]),
    fetchJobs: useCallback((limit: number) => dispatch(fetchJobs(limit)), [dispatch]),
    fetchPartners: useCallback(() => dispatch(fetchPartners()), [dispatch]),
  };

  return <Frontpage {...stateToProps} {...dispatchToProps} />;
};
