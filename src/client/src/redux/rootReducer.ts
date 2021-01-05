import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import groupReducer from './Group/group.reducer';
import roleReducer from './Role/role.reducer';
import memberReducer from './Member/member.reducer';
import eventReducer from './Event/event.reducer';
import optionReducer from './Option/option.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  groupsData: groupReducer,
  rolesData: roleReducer,
  membersData: memberReducer,
  eventsData: eventReducer,
  optionsData: optionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const configStorage = {
  key: 'root',
  storage,
  whitelist: ['optionsData'],
};

export default persistReducer(configStorage, rootReducer);
