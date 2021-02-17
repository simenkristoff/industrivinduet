import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fireActionSuccess, fireActionError } from '@/utils';
import { UserActionTypes, UserEntity } from '@/types';
import apiCaller from '@/state/utils/apiCaller';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

/**
 * Business logic of the effects.
 */

/**
 * Handle async GET request to API for fetching Users.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: UserActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.FETCH.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: UserActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async POST request to API for creating a new User.
 * @param {IPayloadMetaAction<UserEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<UserEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: UserActionTypes.CREATE.SUCCESS, payload: data });
    yield fireActionSuccess('USER', 'CREATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.CREATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: UserActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async PUT request to API for updating a User.
 * @param {IPayloadMetaAction<UserEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<UserEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: UserActionTypes.UPDATE.SUCCESS, payload: data });
    yield fireActionSuccess('USER', 'UPDATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.UPDATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: UserActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async DELETE request to API for deleting a User.
 * @param {IPayloadMetaAction<UserEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<UserEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: UserActionTypes.DELETE.SUCCESS, payload: params.payload });
    yield fireActionSuccess('USER', 'DELETE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.DELETE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: UserActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async token lookup.
 * @param {IPayloadMetaAction<string>} params action with payload and meta data.
 */
function* handleLookupRegisterToken(params: IPayloadMetaAction<string>): Generator {
  try {
    const response = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({
      type: UserActionTypes.LOOKUP_REGISTER_TOKEN.SUCCESS,
      payload: response,
    });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.LOOKUP_REGISTER_TOKEN.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: UserActionTypes.LOOKUP_REGISTER_TOKEN.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Set active User.
 * @param {IPayloadMetaAction<UserEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<UserEntity>): Generator {
  try {
    yield put({ type: UserActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: UserActionTypes.SET.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: UserActionTypes.SET.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Watches every specified action and runs effect method and passes action args to it.
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

function* watchLookupRegisterTokenRequest(): Generator {
  yield takeEvery(UserActionTypes.LOOKUP_REGISTER_TOKEN.START, handleLookupRegisterToken);
}

function* watchSetRequest(): Generator {
  yield takeEvery(UserActionTypes.SET.START, handleSet);
}

/**
 * saga init, forks in effects.
 */
export default function* userSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchLookupRegisterTokenRequest),
    fork(watchSetRequest),
  ]);
}
