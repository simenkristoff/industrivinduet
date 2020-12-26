import {all, call} from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import groupSagas from './Group/group.sagas';
import roleSagas from './Role/role.sagas';
import memberSagas from './Member/member.sagas';

export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(groupSagas),
        call(roleSagas),
        call(memberSagas)
    ]);
}