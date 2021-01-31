import apiCaller from '@/state/utils/apiCaller';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

import { RoleActionTypes, RoleEntity } from './types';

/**
 * @desc Business logic of the effects.
 */

/**
 * @desc Handle async GET request to API for fetching Roles.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: RoleActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: RoleActionTypes.FETCH.ERROR, payload: err.message });
    } else {
      yield put({ type: RoleActionTypes.FETCH.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async POST request to API for creating a new Role.
 * @param {IPayloadMetaAction<RoleEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<RoleEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: RoleActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: RoleActionTypes.CREATE.ERROR, payload: err.message });
    } else {
      yield put({ type: RoleActionTypes.CREATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async PUT request to API for updating a Role.
 * @param {IPayloadMetaAction<RoleEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<RoleEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: RoleActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: RoleActionTypes.UPDATE.ERROR, payload: err.message });
    } else {
      yield put({ type: RoleActionTypes.UPDATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async DELETE request to API for deleting a Role.
 * @param {IPayloadMetaAction<RoleEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<RoleEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: RoleActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: RoleActionTypes.DELETE.ERROR, payload: err.message });
    } else {
      yield put({ type: RoleActionTypes.DELETE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Set active Role.
 * @param {IPayloadMetaAction<RoleEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<RoleEntity>): Generator {
  try {
    yield put({ type: RoleActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: RoleActionTypes.SET.ERROR, payload: err.message });
    } else {
      yield put({ type: RoleActionTypes.SET.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(RoleActionTypes.FETCH.START, handleFetch);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(RoleActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(RoleActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(RoleActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(RoleActionTypes.SET.START, handleSet);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* roleSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}
