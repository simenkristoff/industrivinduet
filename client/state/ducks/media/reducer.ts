import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';
import { MediaActionTypes, MediaState } from '@/types';

import { appendMediaFile, reduceMediaFile, updateFolder } from './helpers';

export const initialState: MediaState = {
  selectedFile: {},
  nodes: {},
  loading: false,
  errors: [],
};

export const mediaReducer = (
  state: MediaState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): MediaState => {
  switch (action.type) {
    case MediaActionTypes.FETCH.START:
    case MediaActionTypes.UPLOAD.START:
    case MediaActionTypes.DELETE.START:
    case MediaActionTypes.CREATE_FOLDER.START:
    case MediaActionTypes.UPDATE_FOLDER.START: {
      return { ...state, loading: true };
    }
    case MediaActionTypes.FETCH.SUCCESS: {
      return { ...initialState, nodes: action.payload };
    }
    case MediaActionTypes.UPLOAD.SUCCESS: {
      return { ...state, nodes: appendMediaFile(state.nodes, action.payload), loading: false };
    }
    case MediaActionTypes.DELETE.SUCCESS: {
      return { ...state, nodes: reduceMediaFile(state.nodes, action.payload), loading: false };
    }
    case MediaActionTypes.CREATE_FOLDER.SUCCESS: {
      return { ...state, nodes: appendMediaFile(state.nodes, action.payload), loading: false };
    }
    case MediaActionTypes.UPDATE_FOLDER.SUCCESS: {
      return { ...state, nodes: updateFolder(state.nodes, action.payload), loading: false };
    }
    case MediaActionTypes.FETCH.ERROR:
    case MediaActionTypes.UPLOAD.ERROR:
    case MediaActionTypes.DELETE.ERROR:
    case MediaActionTypes.CREATE_FOLDER.ERROR:
    case MediaActionTypes.UPDATE_FOLDER.ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    }
    default:
      return state;
  }
};
