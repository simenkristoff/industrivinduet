import apiCaller from '@/state/utils/apiCaller';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

import { GroupActionTypes, GroupEntity } from './types';

/**
 * @desc Business logic of the effects.
 */

/**
 * @desc Handle async GET request to API for fetching Groups.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: GroupActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: GroupActionTypes.FETCH.ERROR, payload: err.message });
    } else {
      yield put({ type: GroupActionTypes.FETCH.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async POST request to API for creating a new Group.
 * @param {IPayloadMetaAction<GroupEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<GroupEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: GroupActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: GroupActionTypes.CREATE.ERROR, payload: err.message });
    } else {
      yield put({ type: GroupActionTypes.CREATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async PUT request to API for updating a Group.
 * @param {IPayloadMetaAction<GroupEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<GroupEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: GroupActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: GroupActionTypes.UPDATE.ERROR, payload: err.message });
    } else {
      yield put({ type: GroupActionTypes.UPDATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async DELETE request to API for deleting a Group.
 * @param {IPayloadMetaAction<GroupEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<GroupEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: GroupActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: GroupActionTypes.DELETE.ERROR, payload: err.message });
    } else {
      yield put({ type: GroupActionTypes.DELETE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Set active Group.
 * @param {IPayloadMetaAction<GroupEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<GroupEntity>): Generator {
  try {
    yield put({ type: GroupActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: GroupActionTypes.SET.ERROR, payload: err.message });
    } else {
      yield put({ type: GroupActionTypes.SET.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(GroupActionTypes.FETCH.START, handleFetch);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(GroupActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(GroupActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(GroupActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(GroupActionTypes.SET.START, handleSet);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* groupSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}