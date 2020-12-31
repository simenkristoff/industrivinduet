import optionTypes from './option.types';

const INITIAL_STATE = {
    options: {}
}

const optionReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case optionTypes.SET_OPTIONS:
            return {
                ...state,
                options: action.payload
            }
        default:
            return state
    }
};

export default optionReducer;
