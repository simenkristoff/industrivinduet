import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { mergeObject } from '../../utils';

import { OptionActionTypes, OptionState } from './types';

export const initialState: OptionState = {
  general: {},
  event: {},
  job: {},
  socials: {},
  loading: false,
  errors: [],
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
    case OptionActionTypes.FETCH.START: {
      return { ...state, loading: true };
    }
    case OptionActionTypes.FETCH.SUCCESS: {
      return { ...initialState, ...action.payload };
    }

    case OptionActionTypes.FETCH.ERROR:
    case OptionActionTypes.UPDATE.ERROR:
    case OptionActionTypes.RESET.ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    }
    default:
      return state;
  }
};
