import { action } from 'typesafe-actions';
import { JobActionTypes } from '@/types';

import { fetchJobs } from '../actions';
import { jobReducer, initialState } from '../reducer';

import jobData from './__mockData__/jobData';

describe('job reducer', () => {
  it('reducer initial', () => {
    expect(jobReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(jobReducer(initialState, fetchJobs())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(jobReducer(initialState, action(JobActionTypes.FETCH.SUCCESS, jobData))).toEqual({
      ...initialState,
      data: jobData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...jobData] };
    expect(jobReducer(currentState, action(JobActionTypes.CREATE.SUCCESS, jobData[0]))).toEqual({
      ...currentState,
      data: [...jobData, jobData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...jobData] };
    const newJob = { ...jobData[0], name: 'Test gruppe' };
    expect(jobReducer(currentState, action(JobActionTypes.UPDATE.SUCCESS, newJob))).toEqual({
      ...currentState,
      data: [newJob, ...jobData.slice(1, jobData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...jobData] };
    expect(jobReducer(currentState, action(JobActionTypes.DELETE.SUCCESS, jobData[0]))).toEqual({
      ...currentState,
      data: jobData.slice(1, jobData.length),
    });
  });

  it('reducer set job', () => {
    expect(jobReducer(initialState, action(JobActionTypes.SET.START, jobData[0]))).toEqual({
      ...initialState,
      byId: jobData[0],
    });
  });

  it('reducer set job to null', () => {
    const currentState = { ...initialState, byId: jobData[0] };
    expect(jobReducer(currentState, action(JobActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
});
