import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { JobActionTypes, JobEntity, JobState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: JobState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * Reducer actions for Jobs.
 * @param {JobState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const jobReducer = (
  state: JobState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): JobState => {
  switch (action.type) {
    case JobActionTypes.FETCH.START:
    case JobActionTypes.FETCH_ONE.START:
    case JobActionTypes.CREATE.START:
    case JobActionTypes.UPDATE.START:
    case JobActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case JobActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case JobActionTypes.FETCH_ONE.SUCCESS: {
      return { ...initialState, byId: action.payload, loading: false, status: null };
    }
    case JobActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case JobActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        data: updateObjectInArray<JobEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case JobActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<JobEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case JobActionTypes.SET.START: {
      return { ...state, byId: action.payload, status: null };
    }
    case JobActionTypes.FETCH.ERROR:
    case JobActionTypes.FETCH_ONE.ERROR:
    case JobActionTypes.CREATE.ERROR:
    case JobActionTypes.UPDATE.ERROR:
    case JobActionTypes.DELETE.ERROR:
    case JobActionTypes.SET.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    case JobActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
