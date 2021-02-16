import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, JobActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';

import { createJob, deleteJob, fetchJob, fetchJobs, setJob, updateJob } from '../actions';
import jobSaga from '../sagas';

import jobData from './__mockData__/jobData';

describe('job saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData]])
      .put({ type: JobActionTypes.FETCH.SUCCESS, payload: jobData })
      .dispatch(fetchJobs())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchJobs())
      .run();
  });

  it('should handle fetch one success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData[0]]])
      .put({ type: JobActionTypes.FETCH_ONE.SUCCESS, payload: jobData[0] })
      .dispatch(fetchJob('job1'))
      .run();
  });

  it('should handle fetch one error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.FETCH_ONE.ERROR, payload: apiResponse })
      .dispatch(fetchJob('job1'))
      .run();
  });

  it('should handle create success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData[0]]])
      .put({ type: JobActionTypes.CREATE.SUCCESS, payload: jobData[0] })
      .dispatch(createJob(jobData[0]))
      .run();
  });

  it('should handle create error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.CREATE.ERROR, payload: apiResponse })
      .dispatch(createJob(jobData[0]))
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData[0]]])
      .put({ type: JobActionTypes.UPDATE.SUCCESS, payload: jobData[0] })
      .dispatch(updateJob(jobData[0]))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updateJob(jobData[0]))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), jobData[0]]])
      .put({ type: JobActionTypes.DELETE.SUCCESS, payload: jobData[0] })
      .dispatch(deleteJob(jobData[0]))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(jobSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: JobActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deleteJob(jobData[0]))
      .run();
  });

  it('should handle set success', () => {
    return expectSaga(jobSaga)
      .put({ type: JobActionTypes.SET.SUCCESS, payload: jobData[0] })
      .dispatch(setJob(jobData[0]))
      .run();
  });
});
