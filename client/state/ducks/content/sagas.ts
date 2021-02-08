import apiCaller from '@/state/utils/apiCaller';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

import { ContentActionTypes, ContentEntity } from './types';

/**
 * @desc Business logic of the effects.
 */

/**
 * @desc Handle async GET request to API for fetching Contents.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: ContentActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: ContentActionTypes.FETCH.ERROR, payload: err.message });
    } else {
      yield put({ type: ContentActionTypes.FETCH.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async POST request to API for creating a new Content.
 * @param {IPayloadMetaAction<ContentEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<ContentEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: ContentActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: ContentActionTypes.CREATE.ERROR, payload: err.message });
    } else {
      yield put({ type: ContentActionTypes.CREATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async PUT request to API for updating a Content.
 * @param {IPayloadMetaAction<ContentEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<ContentEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: ContentActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: ContentActionTypes.UPDATE.ERROR, payload: err.message });
    } else {
      yield put({ type: ContentActionTypes.UPDATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async DELETE request to API for deleting a Content.
 * @param {IPayloadMetaAction<ContentEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<ContentEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: ContentActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: ContentActionTypes.DELETE.ERROR, payload: err.message });
    } else {
      yield put({ type: ContentActionTypes.DELETE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Set active Content.
 * @param {IPayloadMetaAction<ContentEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<ContentEntity>): Generator {
  try {
    yield put({ type: ContentActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: ContentActionTypes.SET.ERROR, payload: err.message });
    } else {
      yield put({ type: ContentActionTypes.SET.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(ContentActionTypes.FETCH.START, handleFetch);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(ContentActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(ContentActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(ContentActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(ContentActionTypes.SET.START, handleSet);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* contentSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}
