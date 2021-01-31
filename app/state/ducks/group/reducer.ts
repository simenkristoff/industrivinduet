import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

import { GroupActionTypes, GroupEntity, GroupState } from './types';

export const initialState: GroupState = {
  byId: {},
  data: [],
  errors: [],
  loading: false,
};

/**
 * @desc Reducer actions for Groups.
 * @param {GroupState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const groupReducer = (
  state: GroupState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): GroupState => {
  switch (action.type) {
    case GroupActionTypes.FETCH.START: {
      return { ...state, loading: true };
    }
    case GroupActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload };
    }
    case GroupActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case GroupActionTypes.UPDATE.SUCCESS: {
      return { ...state, data: updateObjectInArray<GroupEntity>(state.data, action) };
    }
    case GroupActionTypes.DELETE.SUCCESS: {
      return { ...state, data: deleteObjectInArray<GroupEntity>(state.data, action) };
    }
    case GroupActionTypes.SET.SUCCESS: {
      return { ...state, byId: action.payload };
    }
    case GroupActionTypes.FETCH.ERROR:
    case GroupActionTypes.CREATE.ERROR:
    case GroupActionTypes.UPDATE.ERROR:
    case GroupActionTypes.DELETE.ERROR:
    case GroupActionTypes.SET.ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    }
    default:
      return state;
  }
};
