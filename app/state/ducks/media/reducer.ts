import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { updateObjectInArray, deleteObjectInArray } from '../../utils';

import { MediaActionTypes, MediaFile, MediaState } from './types';

export const initialState: MediaState = {
  file: {},
  files: [],
  loading: false,
  errors: [],
};

export const mediaReducer = (
  state: MediaState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): MediaState => {
  switch (action.type) {
    case MediaActionTypes.FETCH.START: {
      return { ...state, loading: true };
    }
    case MediaActionTypes.FETCH.SUCCESS: {
      return { ...initialState, files: action.payload };
    }
    case MediaActionTypes.UPLOAD.SUCCESS: {
      return { ...state, files: [...state.files, action.payload] };
    }
    case MediaActionTypes.DELETE.SUCCESS: {
      return { ...state, files: deleteObjectInArray<MediaFile>(state.files, action) };
    }
    case MediaActionTypes.SET.SUCCESS: {
      return { ...state, file: action.payload };
    }
    case MediaActionTypes.FETCH.ERROR:
    case MediaActionTypes.UPLOAD.ERROR:
    case MediaActionTypes.DELETE.ERROR:
    case MediaActionTypes.SET.ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    }
    default:
      return state;
  }
};
