import { ObjectId } from '@/state/interface';
import { action } from 'typesafe-actions';

import { JobActionTypes, JobEntity } from './types';

/**
 * @desc Fetch all Jobs.
 * @param {number} limit how many Jobs to fetch
 */
export const fetchJobs = (limit?: number) => {
  let query = '';
  if (limit) {
    query = `?limit=${limit}&sorted`;
  }

  return action(JobActionTypes.FETCH.START, [], {
    method: 'get',
    route: `api/jobs${query}`,
  });
};

/**
 * @desc Fetch single Job by ID.
 * @param {ObjectId} id the ID of the Job to fetch
 */
export const fetchJob = (id: ObjectId) =>
  action(JobActionTypes.FETCH_ONE.START, [], {
    method: 'get',
    route: `api/jobs/${id}`,
  });

/**
 * @desc Create a new Job.
 * @param {JobEntity} data the Job to create.
 */
export const createJob = (data: JobEntity) =>
  action(JobActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/jobs',
  });

/**
 * @desc Update a Job.
 * @param {JobEntity} data the Job instance with updated data.
 */
export const updateJob = (data: JobEntity) =>
  action(JobActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/jobs/${data._id}`,
  });

/**
 * @desc Delete Job.
 * @param {JobEntity} data the Job instance to delete.
 */
export const deleteJob = (data: JobEntity) =>
  action(JobActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/jobs/${data._id}`,
  });

/**
 * @desc Set Job.
 * @param {JobEntity} data the Job instance to set.
 */
export const setJob = (data: JobEntity | {}) => action(JobActionTypes.SET.START, data);
