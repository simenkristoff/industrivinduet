import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { EventActionTypes, EventEntity, EventState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: EventState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
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
    case EventActionTypes.FETCH.START:
    case EventActionTypes.FETCH_ONE.START:
    case EventActionTypes.CREATE.START:
    case EventActionTypes.UPDATE.START:
    case EventActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case EventActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case EventActionTypes.FETCH_ONE.SUCCESS: {
      return { ...initialState, byId: action.payload, loading: false, status: null };
    }
    case EventActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case EventActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        data: updateObjectInArray<EventEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case EventActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<EventEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case EventActionTypes.SET.START: {
      return { ...state, byId: action.payload, status: null };
    }
    case EventActionTypes.FETCH.ERROR:
    case EventActionTypes.FETCH_ONE.ERROR:
    case EventActionTypes.CREATE.ERROR:
    case EventActionTypes.UPDATE.ERROR:
    case EventActionTypes.DELETE.ERROR:
    case EventActionTypes.SET.ERROR: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case EventActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
