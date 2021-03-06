import { action } from 'typesafe-actions';

import { ObjectId, JobActionTypes, JobEntity } from '@/types';

/**
 * Fetch all Jobs.
 */
export const fetchJobs = () => {
  return action(JobActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/jobs',
  });
};

/**
 * Fetch all active Jobs.
 * @param {number} limit how many active Jobs to fetch
 */
export const fetchActiveJobs = (limit?: number) => {
  let query = '';
  if (limit) {
    query = `?limit=${limit}`;
  }

  return action(JobActionTypes.FETCH.START, [], {
    method: 'get',
    route: `api/jobs/active${query}`,
  });
};

/**
 * Fetch single Job by ID.
 * @param {ObjectId} id the ID of the Job to fetch
 */
export const fetchJob = (id: ObjectId) =>
  action(JobActionTypes.FETCH_ONE.START, [], {
    method: 'get',
    route: `api/jobs/${id}`,
  });

/**
 * Create a new Job.
 * @param {JobEntity} data the Job to create.
 */
export const createJob = (data: JobEntity) =>
  action(JobActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/jobs',
  });

/**
 * Update a Job.
 * @param {JobEntity} data the Job instance with updated data.
 */
export const updateJob = (data: JobEntity) =>
  action(JobActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/jobs/${data._id}`,
  });

/**
 * Delete Job.
 * @param {JobEntity} data the Job instance to delete.
 */
export const deleteJob = (data: JobEntity) =>
  action(JobActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/jobs/${data._id}`,
  });

/**
 * Set Job.
 * @param {JobEntity} data the Job instance to set.
 */
export const setJob = (data: JobEntity | {}) => action(JobActionTypes.SET.START, data);

/**
 * Clears Job state
 */
export const clear = () => action(JobActionTypes.CLEAR);
