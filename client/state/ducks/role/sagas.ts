import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fireActionSuccess, fireActionError } from '@/utils';
import {
  IMetaAction,
  IPayloadAction,
  IPayloadMetaAction,
  RoleActionTypes,
  RoleEntity,
} from '@/types';
import apiCaller from '@/state/utils/apiCaller';

/**
 * Business logic of the effects.
 */

/**
 * Handle async GET request to API for fetching Roles.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: RoleActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: RoleActionTypes.FETCH.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: RoleActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async POST request to API for creating a new Role.
 * @param {IPayloadMetaAction<RoleEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<RoleEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: RoleActionTypes.CREATE.SUCCESS, payload: data });
    yield fireActionSuccess('ROLE', 'CREATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: RoleActionTypes.CREATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: RoleActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async PUT request to API for updating a Role.
 * @param {IPayloadMetaAction<RoleEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<RoleEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: RoleActionTypes.UPDATE.SUCCESS, payload: data });
    yield fireActionSuccess('ROLE', 'UPDATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: RoleActionTypes.UPDATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: RoleActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async DELETE request to API for deleting a Role.
 * @param {IPayloadMetaAction<RoleEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<RoleEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: RoleActionTypes.DELETE.SUCCESS, payload: params.payload });
    yield fireActionSuccess('ROLE', 'DELETE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: RoleActionTypes.DELETE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: RoleActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Set active Role.
 * @param {IPayloadMetaAction<RoleEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<RoleEntity>): Generator {
  try {
    yield put({ type: RoleActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: RoleActionTypes.SET.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: RoleActionTypes.SET.ERROR,
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
 * saga init, forks in effects.
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
