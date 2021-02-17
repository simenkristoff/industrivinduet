import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { GroupActionTypes, GroupEntity, GroupState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: GroupState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * Reducer actions for Groups.
 * @param {GroupState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const groupReducer = (
  state: GroupState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): GroupState => {
  switch (action.type) {
    case GroupActionTypes.FETCH.START:
    case GroupActionTypes.CREATE.START:
    case GroupActionTypes.UPDATE.START:
    case GroupActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case GroupActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case GroupActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case GroupActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        data: updateObjectInArray<GroupEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case GroupActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<GroupEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case GroupActionTypes.SET.START: {
      return { ...state, byId: action.payload, status: null };
    }
    case GroupActionTypes.FETCH.ERROR:
    case GroupActionTypes.CREATE.ERROR:
    case GroupActionTypes.UPDATE.ERROR:
    case GroupActionTypes.DELETE.ERROR:
    case GroupActionTypes.SET.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    case GroupActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
