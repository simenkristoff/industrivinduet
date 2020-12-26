import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import groupReducer from './Group/group.reducer';
import roleReducer from './Role/role.reducer';
import memberReducer from './Member/member.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    groupsData: groupReducer,
    rolesData: roleReducer,
    membersData: memberReducer
});

const configStorage = {
    key: 'root',
    storage,
    whitelist: [] // what to store
};

export default persistReducer(configStorage, rootReducer);
