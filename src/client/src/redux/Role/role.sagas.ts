import * as Eff from 'redux-saga/effects';
import RoleService from '../../service/role.service';
import roleTypes from './role.types';
import { setRoles, fetchRolesStart, setRole } from './role.actions';

// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const takeLatest: any = Eff.takeLatest;
const call: any = Eff.call;
const all: any = Eff.all;
const put: any = Eff.put;

// Toast
const ToastSwal = withReactContent(
  Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    position: 'top-end',
  }),
);

export function* addRole({ payload }: any) {
  try {
    yield RoleService.create({
      ...payload,
    });
    yield put(fetchRolesStart());
    yield ToastSwal.fire({
      title: 'Vellykket!',
      text: 'Stillingen er lagt til.',
      icon: 'success',
    });
  } catch (err) {
    yield ToastSwal.fire({
      title: 'Feil!',
      text: 'En feil har oppstått.',
      icon: 'error',
    });
    console.log(err);
  }
}

export function* onAddRoleStart() {
  yield takeLatest(roleTypes.ADD_NEW_ROLE_START, addRole);
}

export function* fetchRole(payload: string) {
  try {
    const role = yield RoleService.find(payload);
    yield put(setRole(role));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchRoleStart() {
  yield takeLatest(roleTypes.FETCH_ROLE_START, fetchRole);
}

export function* fetchRoles() {
  try {
    const roles = yield RoleService.findAll();
    yield put(setRoles(roles));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchRolesStart() {
  yield takeLatest(roleTypes.FETCH_ROLES_START, fetchRoles);
}

export function* deleteRole(payload: string) {
  try {
    yield RoleService.delete(payload);
    yield put(fetchRolesStart());
    yield ToastSwal.fire({
      title: 'Vellykket!',
      text: 'Stillingen er slettet.',
      icon: 'success',
    });
  } catch (err) {
    yield ToastSwal.fire({
      title: 'Feil!',
      text: 'En feil har oppstått.',
      icon: 'error',
    });
    console.log(err);
  }
}

export function* updateRole({ payload }: any) {
  try {
    yield RoleService.update(payload);
    yield put(fetchRolesStart());
    yield ToastSwal.fire({
      title: 'Vellykket!',
      text: 'Stillingen er oppdatert.',
      icon: 'success',
    });
  } catch (err) {
    yield ToastSwal.fire({
      title: 'Feil!',
      text: 'En feil har oppstått.',
      icon: 'error',
    });
    console.log(err);
  }
}

export function* onUpdateRoleStart() {
  yield takeLatest(roleTypes.UPDATE_ROLE_START, updateRole);
}

export function* onDeleteRoleStart() {
  yield takeLatest(roleTypes.DELETE_ROLE_START, deleteRole);
}

export default function* roleSagas() {
  yield all([call(onAddRoleStart), call(onFetchRoleStart), call(onFetchRolesStart), call(onUpdateRoleStart), call(onDeleteRoleStart)]);
}
