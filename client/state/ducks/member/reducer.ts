import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { MemberActionTypes, MemberEntity, MemberState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: MemberState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
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
    case MemberActionTypes.FETCH.START:
    case MemberActionTypes.CREATE.START:
    case MemberActionTypes.UPDATE.START:
    case MemberActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case MemberActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case MemberActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case MemberActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        data: updateObjectInArray<MemberEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case MemberActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<MemberEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case MemberActionTypes.SET.START: {
      return { ...state, byId: action.payload, status: null };
    }
    case MemberActionTypes.FETCH.ERROR:
    case MemberActionTypes.CREATE.ERROR:
    case MemberActionTypes.UPDATE.ERROR:
    case MemberActionTypes.DELETE.ERROR:
    case MemberActionTypes.SET.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    case MemberActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
