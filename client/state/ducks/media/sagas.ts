import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { fireMediaActionSuccess, fireActionError } from '@/utils';
import {
  IMetaAction,
  IPayloadMetaAction,
  MediaActionTypes,
  MediaType,
  MediaFolderType,
} from '@/types';
import apiCaller, { fileApiCaller } from '@/state/utils/apiCaller';

/**
 * Business logic of effect.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const file = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: MediaActionTypes.FETCH.SUCCESS, payload: file });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: MediaActionTypes.FETCH.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: MediaActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

function* handleUpload(params: IPayloadMetaAction<FormData>): Generator {
  try {
    const file = yield call(fileApiCaller, params.meta.method, params.meta.route, params.payload);

    yield put({ type: MediaActionTypes.UPLOAD.SUCCESS, payload: file });
    yield fireMediaActionSuccess('UPLOAD');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: MediaActionTypes.UPLOAD.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: MediaActionTypes.UPLOAD.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

function* handleDelete(params: IPayloadMetaAction<MediaType>): Generator {
  try {
    const file = yield call(apiCaller, params.meta.method, params.meta.route, {
      files: params.payload,
    });
    yield put({ type: MediaActionTypes.DELETE.SUCCESS, payload: params.payload });
    yield fireMediaActionSuccess('DELETE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: MediaActionTypes.DELETE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: MediaActionTypes.DELETE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

function* handleCreateFolder(params: IPayloadMetaAction<MediaFolderType>): Generator {
  try {
    yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: MediaActionTypes.CREATE_FOLDER.SUCCESS, payload: params.payload });
    yield fireMediaActionSuccess('CREATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: MediaActionTypes.CREATE_FOLDER.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: MediaActionTypes.CREATE_FOLDER.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

function* handleUpdateFolder(params: IPayloadMetaAction<MediaFolderType>): Generator {
  try {
    yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: MediaActionTypes.UPDATE_FOLDER.SUCCESS, payload: params.payload });
    yield fireMediaActionSuccess('UPDATE');
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: MediaActionTypes.UPDATE_FOLDER.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: MediaActionTypes.UPDATE_FOLDER.ERROR,
        payload: 'An unknown error occured.',
      });
    }
    yield fireActionError();
  }
}

/**
 * Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(MediaActionTypes.FETCH.START, handleFetch);
}

function* watchUploadRequest(): Generator {
  yield takeEvery(MediaActionTypes.UPLOAD.START, handleUpload);
}

function* watchDeleteRequest(): Generator {
  yield takeEvery(MediaActionTypes.DELETE.START, handleDelete);
}

function* watchCreateFolderRequest(): Generator {
  yield takeEvery(MediaActionTypes.CREATE_FOLDER.START, handleCreateFolder);
}

function* watchUpdateFolderRequest(): Generator {
  yield takeEvery(MediaActionTypes.UPDATE_FOLDER.START, handleUpdateFolder);
}

/**
 * saga init, forks in effects, other sagas
 */
export default function* mediaSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchUploadRequest),
    fork(watchDeleteRequest),
    fork(watchCreateFolderRequest),
    fork(watchUpdateFolderRequest),
  ]);
}
