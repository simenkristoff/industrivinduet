import apiCaller from '@/state/utils/apiCaller';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { createJob, deleteJob, fetchJobs, setJob, updateJob } from '../actions';
import jobSaga from '../sagas';
import { JobActionTypes } from '../types';

import jobData from './__mockData__/jobData';

describe('job saga', () => {
  it('handle fetch success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData]])
      .put({ type: JobActionTypes.FETCH.SUCCESS, payload: jobData })
      .dispatch(fetchJobs())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchJobs())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData[0]]])
      .put({ type: JobActionTypes.CREATE.SUCCESS, payload: jobData[0] })
      .dispatch(createJob(jobData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createJob(jobData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData[0]]])
      .put({ type: JobActionTypes.UPDATE.SUCCESS, payload: jobData[0] })
      .dispatch(updateJob(jobData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updateJob(jobData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData[0]]])
      .put({ type: JobActionTypes.DELETE.SUCCESS, payload: jobData[0] })
      .dispatch(deleteJob(jobData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deleteJob(jobData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(jobSaga)
      .put({ type: JobActionTypes.SET.SUCCESS, payload: jobData[0] })
      .dispatch(setJob(jobData[0]))
      .run();
  });
});
