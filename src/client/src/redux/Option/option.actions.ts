import optionTypes from './option.types';

// Types
import { Options } from '../../types';

export const fetchOptionsStart = () => ({
  type: optionTypes.FETCH_OPTIONS_START,
});

export const setOptions = (options: Options) => ({
  type: optionTypes.SET_OPTIONS,
  payload: options,
});

export const updateOptionStart = (options: Options) => ({
  type: optionTypes.UPDATE_OPTION_START,
  payload: options,
});

export const resetAllOptionsStart = () => ({
  type: optionTypes.RESET_ALL_OPTIONS_START,
});
