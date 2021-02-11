import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IApplicationState, JobEntity } from '@/types';

import { JobSingle } from '@/components/JobSingle';
import { fetchJob, setJob } from '@/state/ducks/job/actions';

type ParamTypes = {
  jobID: string;
};

export const JobSingleContainer = () => {
  const dispatch = useDispatch();
  const job: JobEntity = useSelector(({ job }: IApplicationState) => job.byId as JobEntity);
  const { jobID } = useParams<ParamTypes>();

  useEffect(() => {
    dispatch(fetchJob(jobID));

    return () => {
      dispatch(setJob({}));
    };
  }, []);

  return <JobSingle data={job} />;
};
