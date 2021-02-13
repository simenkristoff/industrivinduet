import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { OptionActionTypes, OptionState } from '@/types';

export const initialState: OptionState = {
  general: {},
  event: {},
  job: {},
  socials: {},
  loading: false,
  status: null,
};

/**
 * @desc Reducer actions for Options.
 * @param {OptionState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const optionReducer = (
  state: OptionState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): OptionState => {
  switch (action.type) {
    case OptionActionTypes.FETCH.START:
    case OptionActionTypes.UPDATE.START:
    case OptionActionTypes.RESET.START: {
      return { ...state, loading: true, status: null };
    }
    case OptionActionTypes.FETCH.SUCCESS:
    case OptionActionTypes.UPDATE.SUCCESS:
    case OptionActionTypes.RESET.SUCCESS: {
      return { ...initialState, ...action.payload, loading: false, status: null };
    }
    case OptionActionTypes.FETCH.ERROR:
    case OptionActionTypes.UPDATE.ERROR:
    case OptionActionTypes.RESET.ERROR: {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    }
    case OptionActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
