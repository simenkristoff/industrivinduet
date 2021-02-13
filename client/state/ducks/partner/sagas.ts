import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  IMetaAction,
  IPayloadAction,
  IPayloadMetaAction,
  PartnerActionTypes,
  PartnerEntity,
} from '@/types';
import apiCaller from '@/state/utils/apiCaller';

/**
 * @desc Business logic of the effects.
 */

/**
 * @desc Handle async GET request to API for fetching Partners.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: PartnerActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: PartnerActionTypes.FETCH.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: PartnerActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async POST request to API for creating a new Partner.
 * @param {IPayloadMetaAction<PartnerEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<PartnerEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: PartnerActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: PartnerActionTypes.CREATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: PartnerActionTypes.CREATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async PUT request to API for updating a Partner.
 * @param {IPayloadMetaAction<PartnerEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<PartnerEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: PartnerActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: PartnerActionTypes.UPDATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: PartnerActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async DELETE request to API for deleting a Partner.
 * @param {IPayloadMetaAction<PartnerEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<PartnerEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: PartnerActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: PartnerActionTypes.DELETE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: PartnerActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Set active Partner.
 * @param {IPayloadMetaAction<PartnerEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<PartnerEntity>): Generator {
  try {
    yield put({ type: PartnerActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: PartnerActionTypes.SET.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: PartnerActionTypes.SET.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(PartnerActionTypes.FETCH.START, handleFetch);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(PartnerActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(PartnerActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(PartnerActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(PartnerActionTypes.SET.START, handleSet);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* partnerSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}
