import { action } from 'typesafe-actions';

import { JobActionTypes, JobEntity } from '@/types';
import jobData from '@/__mocks__/jobData';

import {
  clear,
  createJob,
  deleteJob,
  fetchActiveJobs,
  fetchJob,
  fetchJobs,
  setJob,
  updateJob,
} from '../actions';

describe('job actions', () => {
  it('should call @@job.FETCH.START', () => {
    const expectedAction = action(JobActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/jobs',
    });

    expect(fetchJobs()).toEqual(expectedAction);
  });

  it('should call @@job.FETCH.START with query params', () => {
    const expectedAction = action(JobActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/jobs/active?limit=3',
    });

    expect(fetchActiveJobs(3)).toEqual(expectedAction);
  });

  it('should call @@job.FETCH_ONE.START', () => {
    const expectedAction = action(JobActionTypes.FETCH_ONE.START, [], {
      method: 'get',
      route: 'api/jobs/123',
    });

    expect(fetchJob('123')).toEqual(expectedAction);
  });

  it('should call @@job.CREATE.START', () => {
    const payload: JobEntity = jobData[1];
    const expectedAction = action(JobActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/jobs`,
    });

    expect(createJob(payload)).toEqual(expectedAction);
  });

  it('should call @@job.UPDATE.START', () => {
    const payload: JobEntity = jobData[1];
    const expectedAction = action(JobActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/jobs/${payload._id}`,
    });

    expect(updateJob(payload)).toEqual(expectedAction);
  });

  it('should call @@job.DELETE.START', () => {
    const payload: JobEntity = jobData[1];
    const expectedAction = action(JobActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/jobs/${payload._id}`,
    });

    expect(deleteJob(payload)).toEqual(expectedAction);
  });

  it('should call @@job.SET.START', () => {
    const payload: JobEntity = jobData[1];
    const expectedAction = action(JobActionTypes.SET.START, payload);

    expect(setJob(payload)).toEqual(expectedAction);
  });

  it('should call @job.CLEAR', () => {
    const expectedAction = action(JobActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
