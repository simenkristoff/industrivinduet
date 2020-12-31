import optionTypes from './option.types';

export const fetchOptionsStart = () => ({
    type: optionTypes.FETCH_OPTIONS_START
});

export const setOptions = options => ({
    type: optionTypes.SET_OPTIONS,
    payload: options
});

export const updateOptionStart = options => ({
    type: optionTypes.UPDATE_OPTION_START,
    payload: options
});

export const resetAllOptionsStart = () => ({
    type: optionTypes.RESET_ALL_OPTIONS_START
});