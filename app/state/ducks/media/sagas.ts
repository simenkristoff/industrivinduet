import apiCaller from '@/state/utils/apiCaller';
import { action } from 'typesafe-actions';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

import { MediaActionTypes, MediaFile } from './types';

/**
 * @desc Business logic of effect.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const file = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: MediaActionTypes.FETCH.SUCCESS, payload: file });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: MediaActionTypes.FETCH.ERROR, payload: err.message });
    } else {
      yield put({ type: MediaActionTypes.FETCH.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

function* handleGet(params: IPayloadMetaAction<MediaFile>): Generator {
  try {
    const file = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: MediaActionTypes.GET.SUCCESS, payload: file });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: MediaActionTypes.GET.ERROR, payload: err.message });
    } else {
      yield put({ type: MediaActionTypes.GET.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

function* handleUpload(params: IPayloadMetaAction<MediaFile>): Generator {
  try {
    const file = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: MediaActionTypes.UPLOAD.SUCCESS, payload: file });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: MediaActionTypes.UPLOAD.ERROR, payload: err.message });
    } else {
      yield put({ type: MediaActionTypes.UPLOAD.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

function* handleDelete(params: IPayloadMetaAction<MediaFile>): Generator {
  try {
    const file = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: MediaActionTypes.DELETE.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: MediaActionTypes.DELETE.ERROR, payload: err.message });
    } else {
      yield put({ type: MediaActionTypes.DELETE.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

function* handleSet(params: IPayloadAction<MediaFile>): Generator {
  try {
    yield put({ type: MediaActionTypes.SET.SUCCESS, payload: params.payload });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: MediaActionTypes.SET.ERROR, payload: err.message });
    } else {
      yield put({ type: MediaActionTypes.SET.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(MediaActionTypes.FETCH.START, handleFetch);
}

function* watchGetRequest(): Generator {
  yield takeEvery(MediaActionTypes.GET.START, handleGet);
}

function* watchUploadRequest(): Generator {
  yield takeEvery(MediaActionTypes.UPLOAD.START, handleUpload);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(MediaActionTypes.DELETE.START, handleDelete);
}

function* watchSetRequest(): Generator {
  yield takeEvery(MediaActionTypes.SET.START, handleSet);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* mediaSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchGetRequest),
    fork(watchUploadRequest),
    fork(watchDeleteRequest),
    fork(watchSetRequest),
  ]);
}
