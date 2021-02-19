import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  IPayloadMetaAction,
  AuthActionTypes,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from '@/types';
import apiCaller from '@/state/utils/apiCaller';

import { saveToken } from './helpers';

/**
 * Business logic of effect.
 */

/**
 * Handle async POST request to API for registering a new user.
 * @param {IPayloadMetaAction<RegisterCredentials>} params action with meta data.
 */
function* handleRegister(params: IPayloadMetaAction<RegisterCredentials>): Generator {
  try {
    const { token, user }: any = yield call(
      apiCaller,
      params.meta.method,
      params.meta.route,
      params.payload,
    );
    yield saveToken(token);

    yield put({ type: AuthActionTypes.REGISTER.SUCCESS, payload: { user, token } });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AuthActionTypes.REGISTER.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({ type: AuthActionTypes.REGISTER.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * Handle async POST request to API for signing in a user
 * @param {IPayloadMetaAction<LoginCredentials>} params action with meta data.
 */
function* handleLogin(params: IPayloadMetaAction<LoginCredentials>): Generator {
  try {
    const { token, user }: any = yield call(
      apiCaller,
      params.meta.method,
      params.meta.route,
      params.payload,
    );
    yield saveToken(token);
    yield put({ type: AuthActionTypes.LOGIN.SUCCESS, payload: { user, token } });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AuthActionTypes.LOGIN.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({ type: AuthActionTypes.LOGIN.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * Handle async POST request to API for starting forgot password process
 * @param {IPayloadMetaAction<ForgotPasswordCredentials>} params action with meta data.
 */
function* handleForgotPassword(params: IPayloadMetaAction<ForgotPasswordCredentials>): Generator {
  try {
    const response = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({
      type: AuthActionTypes.SEND_FORGOT_PASSWORD.SUCCESS,
      payload: response,
    });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AuthActionTypes.SEND_FORGOT_PASSWORD.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: AuthActionTypes.SEND_FORGOT_PASSWORD.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Handle async POST request to API for resetting password
 * @param {IPayloadMetaAction<ResetPasswordCredentials>} params action with meta data.
 */
function* handleResetPassword(params: IPayloadMetaAction<ResetPasswordCredentials>): Generator {
  try {
    const response = yield call(apiCaller, params.meta.method, params.meta.route, params.payload);
    yield put({
      type: AuthActionTypes.RESET_PASSWORD.SUCCESS,
      payload: response,
    });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      yield put({
        type: AuthActionTypes.RESET_PASSWORD.ERROR,
        payload: { status: 'error', message },
      });
    } else {
      yield put({
        type: AuthActionTypes.RESET_PASSWORD.ERROR,
        payload: 'An unknown error occured.',
      });
    }
  }
}

/**
 * Watches every specified action and runs effect method and passes action args to it
 */
function* watchRegisterRequest(): Generator {
  yield takeEvery(AuthActionTypes.REGISTER.START, handleRegister);
}

function* watchLoginRequest(): Generator {
  yield takeEvery(AuthActionTypes.LOGIN.START, handleLogin);
}

function* watchForgotPasswordRequest(): Generator {
  yield takeEvery(AuthActionTypes.SEND_FORGOT_PASSWORD.START, handleForgotPassword);
}

function* watchResetPasswordRequest(): Generator {
  yield takeEvery(AuthActionTypes.RESET_PASSWORD.START, handleResetPassword);
}

/**
 * saga init, forks in effects, other sagas
 */
export default function* authSaga() {
  yield all([
    fork(watchRegisterRequest),
    fork(watchLoginRequest),
    fork(watchForgotPasswordRequest),
    fork(watchResetPasswordRequest),
  ]);
}
