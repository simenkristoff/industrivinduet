import apiCaller from '@/state/utils/apiCaller';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { IPayloadMetaAction } from '../../interface';
import { UserEntity } from '../user/types';

import { AuthActionTypes, LoginCredentials, RegisterCredentials } from './types';
import { removeToken, saveToken } from './helpers';

/**
 * @desc Business logic of effect.
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
      yield put({ type: AuthActionTypes.REGISTER.ERROR, payload: params.payload.email });
    } else {
      yield put({ type: AuthActionTypes.REGISTER.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

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
      yield put({ type: AuthActionTypes.LOGIN.ERROR, payload: err.message });
    } else {
      yield put({ type: AuthActionTypes.LOGIN.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

function* handleLogout(): Generator {
  try {
    yield removeToken();
    yield put({ type: AuthActionTypes.LOGOUT.SUCCESS });
  } catch (err) {
    if (err instanceof Error) {
      yield put({ type: AuthActionTypes.LOGOUT.ERROR, payload: err.message });
    } else {
      yield put({ type: AuthActionTypes.LOGOUT.ERROR, payload: 'An unknown error occured.' });
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchRegisterRequest(): Generator {
  yield takeEvery(AuthActionTypes.REGISTER.START, handleRegister);
}

function* watchLoginRequest(): Generator {
  yield takeEvery(AuthActionTypes.LOGIN.START, handleLogin);
}

function* watchLogoutRequest(): Generator {
  yield takeEvery(AuthActionTypes.LOGOUT.START, handleLogout);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* authSaga() {
  yield all([fork(watchRegisterRequest), fork(watchLoginRequest), fork(watchLogoutRequest)]);
}
