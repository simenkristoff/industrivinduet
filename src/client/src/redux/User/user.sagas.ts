import * as Eff from 'redux-saga/effects';
import AuthService from '../../service/auth.service';
import userTypes from './user.types';
import { loginUserSuccess, logoutUserSuccess, userError } from './user.actions';

const takeLatest: any = Eff.takeLatest;
const call: any = Eff.call;
const all: any = Eff.all;
const put: any = Eff.put;

export function* loginUser({ payload: { email, password } }: any) {
  try {
    const userData = yield AuthService.login(email, password);
    yield put(loginUserSuccess(userData));
  } catch (err) {
    console.log(err);
  }
}

export function* onLoginUserStart() {
  yield takeLatest(userTypes.LOGIN_USER_START, loginUser);
}

export function* logoutUser() {
  try {
    yield AuthService.logout();
    yield put(logoutUserSuccess);
  } catch (err) {
    console.log(err);
  }
}

export function* onLogoutUserStart() {
  yield takeLatest(userTypes.LOGOUT_USER_START, logoutUser);
}

export function* registerUser({ payload: { username, email, password, confirmPassword } }: any) {
  if (!username) {
    const err = ['Brukernavn må fylles'];
    yield put(userError(err));
    return;
  }

  if (!email) {
    const err = ['Email må fylles'];
    yield put(userError(err));
    return;
  }

  if (!password) {
    const err = ['Passord må fylles'];
    yield put(userError(err));
    return;
  }

  if (!confirmPassword) {
    const err = ['Verifiser passordet'];
    yield put(userError(err));
    return;
  }

  if (password !== confirmPassword) {
    const err = ['Passordene er ikke like'];
    yield put(userError(err));
    return;
  }

  try {
    yield AuthService.register({ username, email, password });
  } catch (err) {
    console.log(err);
  }
}

export function* onRegisterUserStart() {
  yield takeLatest(userTypes.REGISTER_USER_START, registerUser);
}

export default function* userSagas() {
  yield all([call(onRegisterUserStart), call(onLoginUserStart), call(onLogoutUserStart)]);
}
