import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

import { EventActionTypes, EventEntity, EventState } from './types';

export const initialState: EventState = {
  byId: {},
  data: [],
  errors: [],
  loading: false,
};

/**
 * @desc Reducer actions for Events.
 * @param {EventState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const eventReducer = (
  state: EventState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): EventState => {
  switch (action.type) {
    case EventActionTypes.FETCH.START: {
      return { ...state, loading: true };
    }
    case EventActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload };
    }
    case EventActionTypes.FETCH_ONE.START: {
      return { ...state, loading: true };
    }
    case EventActionTypes.FETCH_ONE.SUCCESS: {
      return { ...initialState, byId: action.payload };
    }
    case EventActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case EventActionTypes.UPDATE.SUCCESS: {
      return { ...state, data: updateObjectInArray<EventEntity>(state.data, action) };
    }
    case EventActionTypes.DELETE.SUCCESS: {
      return { ...state, data: deleteObjectInArray<EventEntity>(state.data, action) };
    }
    case EventActionTypes.SET.START: {
      return { ...state, byId: action.payload };
    }
    case EventActionTypes.FETCH.ERROR:
    case EventActionTypes.FETCH_ONE.ERROR:
    case EventActionTypes.CREATE.ERROR:
    case EventActionTypes.UPDATE.ERROR:
    case EventActionTypes.DELETE.ERROR:
    case EventActionTypes.SET.ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    }
    default:
      return state;
  }
};
