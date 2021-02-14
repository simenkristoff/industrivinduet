import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fireActionSuccess, fireActionError } from '@/utils';
import {
  IMetaAction,
  IPayloadAction,
  IPayloadMetaAction,
  ContentActionTypes,
  ContentEntity,
} from '@/types';
import apiCaller from '@/state/utils/apiCaller';

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
      const { message } = err;
      yield put({
        type: ContentActionTypes.FETCH.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: ContentActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
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
    yield fireActionSuccess('CONTENT', 'CREATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: ContentActionTypes.CREATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: ContentActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
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
    yield fireActionSuccess('CONTENT', 'UPDATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: ContentActionTypes.UPDATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: ContentActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
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
    yield fireActionSuccess('CONTENT', 'DELETE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: ContentActionTypes.DELETE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: ContentActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
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
      const { message } = err;
      yield put({
        type: ContentActionTypes.SET.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: ContentActionTypes.SET.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
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
