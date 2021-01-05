import eventTypes from './event.types';

const INITIAL_STATE = {
  events: [],
  event: {},
};

const eventReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case eventTypes.SET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    case eventTypes.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
