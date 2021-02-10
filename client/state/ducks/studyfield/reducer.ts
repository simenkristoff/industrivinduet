import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';
import { StudyFieldActionTypes, StudyFieldEntity, StudyFieldState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: StudyFieldState = {
  byId: {},
  data: [],
  errors: [],
  loading: false,
};

/**
 * @desc Reducer actions for StudyFields.
 * @param {StudyFieldState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const studyfieldReducer = (
  state: StudyFieldState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): StudyFieldState => {
  switch (action.type) {
    case StudyFieldActionTypes.FETCH.START: {
      return { ...state, loading: true };
    }
    case StudyFieldActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload };
    }
    case StudyFieldActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case StudyFieldActionTypes.UPDATE.SUCCESS: {
      return { ...state, data: updateObjectInArray<StudyFieldEntity>(state.data, action) };
    }
    case StudyFieldActionTypes.DELETE.SUCCESS: {
      return { ...state, data: deleteObjectInArray<StudyFieldEntity>(state.data, action) };
    }
    case StudyFieldActionTypes.SET.START: {
      return { ...state, byId: action.payload };
    }
    case StudyFieldActionTypes.FETCH.ERROR:
    case StudyFieldActionTypes.CREATE.ERROR:
    case StudyFieldActionTypes.UPDATE.ERROR:
    case StudyFieldActionTypes.DELETE.ERROR:
    case StudyFieldActionTypes.SET.ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    }
    default:
      return state;
  }
};
