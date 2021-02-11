import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';
import { MemberActionTypes, MemberEntity, MemberState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: MemberState = {
  byId: {},
  data: [],
  errors: [],
  loading: false,
};

/**
 * @desc Reducer actions for Members.
 * @param {MemberState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const memberReducer = (
  state: MemberState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): MemberState => {
  switch (action.type) {
    case MemberActionTypes.FETCH.START: {
      return { ...state, loading: true };
    }
    case MemberActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload };
    }
    case MemberActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case MemberActionTypes.UPDATE.SUCCESS: {
      return { ...state, data: updateObjectInArray<MemberEntity>(state.data, action) };
    }
    case MemberActionTypes.DELETE.SUCCESS: {
      return { ...state, data: deleteObjectInArray<MemberEntity>(state.data, action) };
    }
    case MemberActionTypes.SET.START: {
      return { ...state, byId: action.payload };
    }
    case MemberActionTypes.FETCH.ERROR:
    case MemberActionTypes.CREATE.ERROR:
    case MemberActionTypes.UPDATE.ERROR:
    case MemberActionTypes.DELETE.ERROR:
    case MemberActionTypes.SET.ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    }
    default:
      return state;
  }
};
