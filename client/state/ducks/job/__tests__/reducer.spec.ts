import { action } from 'typesafe-actions';

import { ApiResponse, JobActionTypes } from '@/types';

import { jobReducer, initialState } from '../reducer';

import jobData from './__mockData__/jobData';

describe('job reducer', () => {
  it('should equal initial state', () => {
    expect(jobReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(jobReducer(initialState, { type: JobActionTypes.FETCH.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
    expect(
      jobReducer(initialState, { type: JobActionTypes.FETCH_ONE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(jobReducer(initialState, { type: JobActionTypes.CREATE.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
    expect(
      jobReducer(initialState, {
        type: JobActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(jobReducer(initialState, { type: JobActionTypes.DELETE.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(jobReducer(initialState, action(JobActionTypes.FETCH.SUCCESS, jobData))).toEqual({
      ...initialState,
      data: jobData,
      loading: false,
    });
  });
  it('should set byId on FETCH_ONE.SUCCESS', () => {
    expect(jobReducer(initialState, action(JobActionTypes.FETCH_ONE.SUCCESS, jobData[0]))).toEqual({
      ...initialState,
      byId: jobData[0],
      loading: false,
    });
  });
  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...jobData], loading: true };
    expect(jobReducer(currentState, action(JobActionTypes.CREATE.SUCCESS, jobData[0]))).toEqual({
      ...currentState,
      data: [...jobData, jobData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...jobData], loading: true };
    const newJob = { ...jobData[0], name: 'Test gruppe' };
    expect(jobReducer(currentState, action(JobActionTypes.UPDATE.SUCCESS, newJob))).toEqual({
      ...currentState,
      data: [newJob, ...jobData.slice(1, jobData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...jobData], loading: true };
    expect(jobReducer(currentState, action(JobActionTypes.DELETE.SUCCESS, jobData[0]))).toEqual({
      ...currentState,
      data: jobData.slice(1, jobData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(jobReducer(initialState, action(JobActionTypes.SET.START, jobData[0]))).toEqual({
      ...initialState,
      byId: jobData[0],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: jobData[0] };
    expect(jobReducer(currentState, action(JobActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
  it('should set status on all ERROR', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };
    const state = { ...initialState, loading: true };
    const expectedState = { ...initialState, loading: false, status: apiResponse };
    expect(jobReducer(state, { type: JobActionTypes.FETCH.ERROR, payload: apiResponse })).toEqual({
      ...expectedState,
    });
    expect(
      jobReducer(state, { type: JobActionTypes.FETCH_ONE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(jobReducer(state, { type: JobActionTypes.CREATE.ERROR, payload: apiResponse })).toEqual({
      ...expectedState,
    });
    expect(jobReducer(state, { type: JobActionTypes.UPDATE.ERROR, payload: apiResponse })).toEqual({
      ...expectedState,
    });
    expect(jobReducer(state, { type: JobActionTypes.DELETE.ERROR, payload: apiResponse })).toEqual({
      ...expectedState,
    });
    expect(jobReducer(state, { type: JobActionTypes.SET.ERROR, payload: apiResponse })).toEqual({
      ...expectedState,
    });
  });
  it('should clear job state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      jobReducer(state, {
        type: JobActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
