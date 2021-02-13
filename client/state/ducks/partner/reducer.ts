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
    case PartnerActionTypes.FETCH.START: {
      return { ...state, loading: true };
    }
    case PartnerActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload };
    }
    case PartnerActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case PartnerActionTypes.UPDATE.SUCCESS: {
      return { ...state, data: updateObjectInArray<PartnerEntity>(state.data, action) };
    }
    case PartnerActionTypes.DELETE.SUCCESS: {
      return { ...state, data: deleteObjectInArray<PartnerEntity>(state.data, action) };
    }
    case PartnerActionTypes.SET.SUCCESS: {
      return { ...state, byId: action.payload };
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
    default:
      return state;
  }
};
