import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { RoleActionTypes, RoleEntity, RoleState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: RoleState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * @desc Reducer actions for Roles.
 * @param {RoleState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const roleReducer = (
  state: RoleState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): RoleState => {
  switch (action.type) {
    case RoleActionTypes.FETCH.START:
    case RoleActionTypes.CREATE.START:
    case RoleActionTypes.UPDATE.START:
    case RoleActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case RoleActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case RoleActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case RoleActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        data: updateObjectInArray<RoleEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case RoleActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<RoleEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case RoleActionTypes.SET.START: {
      return { ...state, byId: action.payload, status: null };
    }
    case RoleActionTypes.FETCH.ERROR:
    case RoleActionTypes.CREATE.ERROR:
    case RoleActionTypes.UPDATE.ERROR:
    case RoleActionTypes.DELETE.ERROR:
    case RoleActionTypes.SET.ERROR: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case RoleActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
