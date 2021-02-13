import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { PartnerActionTypes, PartnerEntity, PartnerState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: PartnerState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * @desc Reducer actions for Partners.
 * @param {PartnerState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const partnerReducer = (
  state: PartnerState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): PartnerState => {
  switch (action.type) {
    case PartnerActionTypes.FETCH.START:
    case PartnerActionTypes.CREATE.START:
    case PartnerActionTypes.UPDATE.START:
    case PartnerActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case PartnerActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case PartnerActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case PartnerActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        data: updateObjectInArray<PartnerEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case PartnerActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<PartnerEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case PartnerActionTypes.SET.START: {
      return { ...state, byId: action.payload, status: null };
    }
    case PartnerActionTypes.FETCH.ERROR:
    case PartnerActionTypes.CREATE.ERROR:
    case PartnerActionTypes.UPDATE.ERROR:
    case PartnerActionTypes.DELETE.ERROR:
    case PartnerActionTypes.SET.ERROR: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case PartnerActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
