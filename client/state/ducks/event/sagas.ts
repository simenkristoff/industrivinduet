import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fireActionSuccess, fireActionError } from '@/utils';
import {
  IMetaAction,
  IPayloadAction,
  IPayloadMetaAction,
  EventActionTypes,
  EventEntity,
} from '@/types';
import apiCaller from '@/state/utils/apiCaller';

/**
 * Business logic of the effects.
 */

/**
 * Handle async GET request to API for fetching Events.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: EventActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: EventActionTypes.FETCH.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: EventActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async GET request to API for fetching an Event by ID.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetchOne(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: EventActionTypes.FETCH_ONE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: EventActionTypes.FETCH_ONE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: EventActionTypes.FETCH_ONE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async POST request to API for creating a new Event.
 * @param {IPayloadMetaAction<EventEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<EventEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: EventActionTypes.CREATE.SUCCESS, payload: data });
    yield fireActionSuccess('EVENT', 'CREATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: EventActionTypes.CREATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: EventActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async PUT request to API for updating a Event.
 * @param {IPayloadMetaAction<EventEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<EventEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: EventActionTypes.UPDATE.SUCCESS, payload: data });
    yield fireActionSuccess('EVENT', 'UPDATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: EventActionTypes.UPDATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: EventActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Handle async DELETE request to API for deleting a Event.
 * @param {IPayloadMetaAction<EventEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<EventEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: EventActionTypes.DELETE.SUCCESS, payload: params.payload });
    yield fireActionSuccess('EVENT', 'DELETE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: EventActionTypes.DELETE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: EventActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Set active Event.
 * @param {IPayloadMetaAction<EventEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<EventEntity>): Generator {
  try {
    yield put({ type: EventActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: EventActionTypes.SET.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: EventActionTypes.SET.ERROR,
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
  yield takeEvery(EventActionTypes.FETCH.START, handleFetch);
}

function* watchFetchOneRequest(): Generator {
  yield takeEvery(EventActionTypes.FETCH_ONE.START, handleFetchOne);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(EventActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(EventActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(EventActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(EventActionTypes.SET.START, handleSet);
}

/**
 * saga init, forks in effects.
 */
export default function* eventSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchOneRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}
