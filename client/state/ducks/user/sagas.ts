import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import apiCaller from '@/state/utils/apiCaller';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

import { UserActionTypes, UserEntity } from './types';

/**
 * @desc Business logic of the effects.
 */

/**
 * @desc Handle async GET request to API for fetching Users.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: UserActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: UserActionTypes.FETCH.ERROR, payload: err.message });
    } else {
      yield put({ type: UserActionTypes.FETCH.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async POST request to API for creating a new User.
 * @param {IPayloadMetaAction<UserEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<UserEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: UserActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: UserActionTypes.CREATE.ERROR, payload: err.message });
    } else {
      yield put({ type: UserActionTypes.CREATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async PUT request to API for updating a User.
 * @param {IPayloadMetaAction<UserEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<UserEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: UserActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: UserActionTypes.UPDATE.ERROR, payload: err.message });
    } else {
      yield put({ type: UserActionTypes.UPDATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async DELETE request to API for deleting a User.
 * @param {IPayloadMetaAction<UserEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<UserEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: UserActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: UserActionTypes.DELETE.ERROR, payload: err.message });
    } else {
      yield put({ type: UserActionTypes.DELETE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Set active User.
 * @param {IPayloadMetaAction<UserEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<UserEntity>): Generator {
  try {
    yield put({ type: UserActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: UserActionTypes.SET.ERROR, payload: err.message });
    } else {
      yield put({ type: UserActionTypes.SET.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(UserActionTypes.FETCH.START, handleFetch);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(UserActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(UserActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(UserActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(UserActionTypes.SET.START, handleSet);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* userSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}
