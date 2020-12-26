import memberTypes from './member.types';

const INITIAL_STATE = {
    members: [],
    member: {}
};

const memberReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case memberTypes.SET_MEMBER:
            return {
                ...state,
                member: action.payload
            }
        case memberTypes.SET_MEMBERS:
            return {
                ...state,
                members: action.payload
            }
        default:
            return state
    }
}

export default memberReducer;
