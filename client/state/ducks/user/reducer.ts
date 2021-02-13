import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { UserActionTypes, UserEntity, UserState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: UserState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * @desc Reducer actions for Users.
 * @param {UserState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const userReducer = (
  state: UserState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH.START:
    case UserActionTypes.DELETE.START:
    case UserActionTypes.CREATE.START:
    case UserActionTypes.DELETE.START: {
      return { ...state, loading: true };
    }
    case UserActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload };
    }
    case UserActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case UserActionTypes.UPDATE.SUCCESS: {
      return { ...state, data: updateObjectInArray<UserEntity>(state.data, action) };
    }
    case UserActionTypes.DELETE.SUCCESS: {
      return { ...state, data: deleteObjectInArray<UserEntity>(state.data, action) };
    }
    case UserActionTypes.LOOKUP_REGISTER_TOKEN.SUCCESS:
    case UserActionTypes.SET.START: {
      return { ...state, byId: action.payload };
    }
    case UserActionTypes.FETCH.ERROR:
    case UserActionTypes.CREATE.ERROR:
    case UserActionTypes.UPDATE.ERROR:
    case UserActionTypes.DELETE.ERROR:
    case UserActionTypes.LOOKUP_REGISTER_TOKEN.ERROR:
    case UserActionTypes.SET.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    default:
      return state;
  }
};
