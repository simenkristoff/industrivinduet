import { all, call } from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import groupSagas from './Group/group.sagas';
import roleSagas from './Role/role.sagas';
import memberSagas from './Member/member.sagas';
import eventSagas from './Event/event.sagas';
import optionSagas from './Option/option.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(groupSagas), call(roleSagas), call(memberSagas), call(eventSagas), call(optionSagas)]);
}
