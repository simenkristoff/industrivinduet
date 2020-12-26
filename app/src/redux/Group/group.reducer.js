import groupTypes from './group.types';

const INITIAL_STATE = {
    groups: [],
    group: {}
};

const groupReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case groupTypes.SET_GROUP:
            return {
                ...state,
                group: action.payload
            }
        case groupTypes.SET_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        default:
            return state
    }
}

export default groupReducer;
