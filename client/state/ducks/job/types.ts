import { Entity } from '@/types';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import {
  BaseState,
  IMetaAction,
  IPayloadAction,
  IPayloadMetaAction,
  ObjectId,
} from '../../interface';
import { StudyFieldEntity } from '../studyfield/types';

/**
 * Type describing the Job state.
 */
export type JobState = BaseState<JobEntity>;

/**
 * Interface describing a Job Entity.
 */
export interface JobEntity extends Entity {
  title: string;
  company: string;
  type: string;
  startdate?: Date;
  deadline: Date;
  places: string[];
  description: string;
  grades: string[];
  image: string;
  link: string;
  studyfields: StudyFieldEntity[] | null;
  active: boolean;
}

/**
 * Object containing the action types for the Job state.
 */
export const JobActionTypes = {
  FETCH: generateAsyncAction('@@job.FETCH'),
  FETCH_ONE: generateAsyncAction('@@job.FETCH_ONE'),
  CREATE: generateAsyncAction('@@job.CREATE'),
  UPDATE: generateAsyncAction('@@job.UPDATE'),
  DELETE: generateAsyncAction('@@job.DELETE'),
  SET: generateAsyncAction('@@job.SET'),
  CLEAR: '@@job.CLEAR',
};

/**
 * Interface for all the available Job state actions.
 */
export interface JobActions {
  fetchJobs: () => IMetaAction;
  fetchActiveJobs: (limit?: number) => IMetaAction;
  fetchJob: (id: ObjectId) => IMetaAction;
  createJob: (job: JobEntity) => IPayloadMetaAction<JobEntity>;
  updateJob: (job: JobEntity) => IPayloadMetaAction<JobEntity>;
  deleteJob: (job: JobEntity) => IPayloadMetaAction<JobEntity>;
  setJob: (job: JobEntity) => IPayloadAction<JobEntity>;
  clear: () => IMetaAction;
}

/**
 * Interface describing all props and actions of JobState
 */
export interface JobPropsAll extends JobState, JobActions {}
