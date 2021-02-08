import { action } from 'typesafe-actions';

import { createJob, deleteJob, fetchJobs, setJob, updateJob } from '../actions';
import { JobActionTypes, JobEntity } from '../types';

import jobData from './__mockData__/jobData';

describe('job actions', () => {
  // FETCH: Test if the correct function is called when fetching Jobs.
  it('fetch jobs', () => {
    const expectedAction = action(JobActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/jobs',
    });

    expect(fetchJobs()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a Job.
  it('create job', () => {
    const payload: JobEntity = jobData[1];
    const expectedAction = action(JobActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/jobs`,
    });

    expect(createJob(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Job.
  it('update job', () => {
    const payload: JobEntity = jobData[1];
    const expectedAction = action(JobActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/jobs/${payload._id}`,
    });

    expect(updateJob(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Job.
  it('delete job', () => {
    const payload: JobEntity = jobData[1];
    const expectedAction = action(JobActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/jobs/${payload._id}`,
    });

    expect(deleteJob(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting Job.
  it('set job', () => {
    const payload: JobEntity = jobData[1];
    const expectedAction = action(JobActionTypes.SET.START, payload);

    expect(setJob(payload)).toEqual(expectedAction);
  });
});
