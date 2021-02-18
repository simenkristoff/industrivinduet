import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IApplicationState, JobState } from '@/types';
import { JobSingle } from '@/components/JobSingle';
import { fetchJob, setJob } from '@/state/ducks/job/actions';

type ParamTypes = {
  jobID: string;
};

/**
 * Container for JobSingle component. Fetches job by the id
 * set in the location path.
 */
export const JobSingleContainer = () => {
  const dispatch = useDispatch();
  const job: JobState = useSelector(({ job }: IApplicationState) => job);
  const { jobID } = useParams<ParamTypes>();

  useEffect(() => {
    dispatch(fetchJob(jobID));

    return () => {
      dispatch(setJob({}));
    };
  }, []);

  return <JobSingle data={job.byId} loading={job.loading} />;
};
