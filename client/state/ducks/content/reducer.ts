import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { ContentActionTypes, ContentEntity, ContentState } from '@/types';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

export const initialState: ContentState = {
  byId: {},
  data: [],
  loading: false,
  status: null,
};

/**
 * @desc Reducer actions for Contents.
 * @param {ContentState} state the initial state.
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, any>} action the action and state params to set.
 */
export const contentReducer = (
  state: ContentState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): ContentState => {
  switch (action.type) {
    case ContentActionTypes.FETCH.START:
    case ContentActionTypes.CREATE.START:
    case ContentActionTypes.UPDATE.START:
    case ContentActionTypes.DELETE.START: {
      return { ...state, loading: true, status: null };
    }
    case ContentActionTypes.FETCH.SUCCESS: {
      return { ...initialState, data: action.payload, loading: false, status: null };
    }
    case ContentActionTypes.CREATE.SUCCESS: {
      return { ...state, data: [...state.data, action.payload], loading: false, status: null };
    }
    case ContentActionTypes.UPDATE.SUCCESS: {
      return {
        ...state,
        data: updateObjectInArray<ContentEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case ContentActionTypes.DELETE.SUCCESS: {
      return {
        ...state,
        data: deleteObjectInArray<ContentEntity>(state.data, action),
        loading: false,
        status: null,
      };
    }
    case ContentActionTypes.SET.START: {
      return { ...state, byId: action.payload, status: null };
    }
    case ContentActionTypes.FETCH.ERROR:
    case ContentActionTypes.CREATE.ERROR:
    case ContentActionTypes.UPDATE.ERROR:
    case ContentActionTypes.DELETE.ERROR:
    case ContentActionTypes.SET.ERROR: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case ContentActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };
    default:
      return state;
  }
};
