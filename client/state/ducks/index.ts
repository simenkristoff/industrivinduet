import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all, fork } from 'redux-saga/effects';

import { IApplicationState } from '../interface';

import { options, optionSaga } from './option';
import { auth, authSaga } from './auth';
import { media, mediaSaga } from './media';
import { content, contentSaga } from './content';
import { studyfield, studyfieldSaga } from './studyfield';
import { partner, partnerSaga } from './partner';
import { group, groupSaga } from './group';
import { role, roleSaga } from './role';
import { member, memberSaga } from './member';
import { user, userSaga } from './user';
import { event, eventSaga } from './event';
import { job, jobSaga } from './job';

const reducers = {
  options,
  auth,
  media,
  content,
  studyfield,
  partner,
  group,
  role,
  member,
  user,
  event,
  job,
};

/**
 * @desc Type of all reducers combined.
 */
export type Reducers = typeof reducers;

export const rootReducer = combineReducers<IApplicationState>({
  ...reducers,
});

export const configStorage = {
  key: 'root',
  storage,
  whitelist: ['options'],
};

export const persistentReducer = persistReducer(configStorage, rootReducer);

export function* rootSaga() {
  yield all([
    fork(optionSaga),
    fork(authSaga),
    fork(mediaSaga),
    fork(contentSaga),
    fork(studyfieldSaga),
    fork(partnerSaga),
    fork(groupSaga),
    fork(roleSaga),
    fork(memberSaga),
    fork(userSaga),
    fork(eventSaga),
    fork(jobSaga),
  ]);
}
