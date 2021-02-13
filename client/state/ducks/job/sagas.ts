import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  IMetaAction,
  IPayloadAction,
  IPayloadMetaAction,
  JobActionTypes,
  JobEntity,
} from '@/types';
import apiCaller from '@/state/utils/apiCaller';

/**
 * @desc Business logic of the effects.
 */

/**
 * @desc Handle async GET request to API for fetching Jobs.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: JobActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: JobActionTypes.FETCH.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: JobActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async GET request to API for fetching an Job by ID.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetchOne(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: JobActionTypes.FETCH_ONE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: JobActionTypes.FETCH_ONE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: JobActionTypes.FETCH_ONE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async POST request to API for creating a new Job.
 * @param {IPayloadMetaAction<JobEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<JobEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: JobActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: JobActionTypes.CREATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: JobActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async PUT request to API for updating a Job.
 * @param {IPayloadMetaAction<JobEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<JobEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: JobActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: JobActionTypes.UPDATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: JobActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async DELETE request to API for deleting a Job.
 * @param {IPayloadMetaAction<JobEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<JobEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: JobActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: JobActionTypes.DELETE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: JobActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Set active Job.
 * @param {IPayloadMetaAction<JobEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<JobEntity>): Generator {
  try {
    yield put({ type: JobActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: JobActionTypes.SET.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: JobActionTypes.SET.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(JobActionTypes.FETCH.START, handleFetch);
}

function* watchFetchOneRequest(): Generator {
  yield takeEvery(JobActionTypes.FETCH_ONE.START, handleFetchOne);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(JobActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(JobActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(JobActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(JobActionTypes.SET.START, handleSet);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* jobSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchOneRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}
