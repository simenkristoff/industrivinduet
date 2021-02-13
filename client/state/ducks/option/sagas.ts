import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { IMetaAction, IPayloadMetaAction, OptionActionTypes, OptionEntity } from '@/types';
import apiCaller from '@/state/utils/apiCaller';

/**
 * @desc Business logic of the effects.
 */

/**
 * @desc Handle async GET request to API for fetching Options.
 * @param {IMetaAction} params action with meta data.
 */
function* handleFetch(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: OptionActionTypes.FETCH.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: OptionActionTypes.FETCH.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: OptionActionTypes.FETCH.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async PUT request to API for updating a Option.
 * @param {IPayloadMetaAction<OptionEntity>} params action with payload and meta data.
 */
function* handleUpdate(params: IPayloadMetaAction<OptionEntity>): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({ type: OptionActionTypes.UPDATE.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: OptionActionTypes.UPDATE.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: OptionActionTypes.UPDATE.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Handle async DELETE request to API for resetting the Options.
 * @fires [fetchOptions]{@link fetchOptions}
 *
 * @param {IMetaAction} params action with payload and meta data.
 */
function* handleReset(params: IMetaAction): Generator {
  try {
    const data = yield call(apiCaller, params.meta.method, params.meta.route);
    yield put({ type: OptionActionTypes.RESET.SUCCESS, payload: data });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: OptionActionTypes.RESET.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: OptionActionTypes.RESET.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it.
 */
function* watchFetchRequest(): Generator {
  yield takeEvery(OptionActionTypes.FETCH.START, handleFetch);
}

function* watchUpdateRequest(): Generator {
  yield takeEvery(OptionActionTypes.UPDATE.START, handleUpdate);
}

function* watchResetRequest(): Generator {
  yield takeEvery(OptionActionTypes.RESET.START, handleReset);
}

/**
 * @desc saga init, forks in effects.
 */
export default function* optionSaga() {
  yield all([fork(watchFetchRequest), fork(watchUpdateRequest), fork(watchResetRequest)]);
}
