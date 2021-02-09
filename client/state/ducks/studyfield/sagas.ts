import apiCaller from '@/state/utils/apiCaller';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

import { StudyFieldActionTypes, StudyFieldEntity } from './types';

/**
 * @desc Business logic of the effects.
 */

/**
 * @desc Handle async GET request to API for fetching StudyFields.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: StudyFieldActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: StudyFieldActionTypes.FETCH.ERROR, payload: err.message });
    } else {
      yield put({ type: StudyFieldActionTypes.FETCH.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async POST request to API for creating a new StudyField.
 * @param {IPayloadMetaAction<StudyFieldEntity>} params action with payload and meta data.
 */
function* handleCreate(params: IPayloadMetaAction<StudyFieldEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: StudyFieldActionTypes.CREATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: StudyFieldActionTypes.CREATE.ERROR, payload: err.message });
    } else {
      yield put({ type: StudyFieldActionTypes.CREATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async PUT request to API for updating a StudyField.
 * @param {IPayloadMetaAction<StudyFieldEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<StudyFieldEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: StudyFieldActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: StudyFieldActionTypes.UPDATE.ERROR, payload: err.message });
    } else {
      yield put({ type: StudyFieldActionTypes.UPDATE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Handle async DELETE request to API for deleting a StudyField.
 * @param {IPayloadMetaAction<StudyFieldEntity>} params action with payload and meta data.
 */
function* handleDelete(params: IPayloadMetaAction<StudyFieldEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: StudyFieldActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: StudyFieldActionTypes.DELETE.ERROR, payload: err.message });
    } else {
      yield put({ type: StudyFieldActionTypes.DELETE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Set active StudyField.
 * @param {IPayloadMetaAction<StudyFieldEntity>} params action with payload and meta data.
 */
function* handleSet(params: IPayloadAction<StudyFieldEntity>): Generator {
  try {
    yield put({ type: StudyFieldActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: StudyFieldActionTypes.SET.ERROR, payload: err.message });
    } else {
      yield put({ type: StudyFieldActionTypes.SET.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(StudyFieldActionTypes.FETCH.START, handleFetch);
}

function* watchCreateRequest(): Generator {
  yield takeEvery(StudyFieldActionTypes.CREATE.START, handleCreate);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(StudyFieldActionTypes.UPDATE.START, handleUpdate);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(StudyFieldActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(StudyFieldActionTypes.SET.START, handleSet);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* studyfieldSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchCreateRequest),
    fork(watchUpdateRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}