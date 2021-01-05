import * as Eff from 'redux-saga/effects';
import GroupService from '../../service/group.service';
import groupTypes from './group.types';
import { setGroups, fetchGroupsStart, setGroup } from './group.actions';

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

export function* addGroup({ payload }: any) {
  try {
    yield GroupService.create({
      ...payload,
    });
    yield put(fetchGroupsStart());
    yield ToastSwal.fire({
      title: 'Vellykket!',
      text: 'Gruppen er lagt til.',
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

export function* onAddGroupStart() {
  yield takeLatest(groupTypes.ADD_NEW_GROUP_START, addGroup);
}

export function* fetchGroup(payload: string) {
  try {
    const group = yield GroupService.find(payload);
    yield put(setGroup(group));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchGroupStart() {
  yield takeLatest(groupTypes.FETCH_GROUP_START, fetchGroup);
}

export function* fetchGroups() {
  try {
    const groups = yield GroupService.findAll();
    yield put(setGroups(groups));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchGroupsStart() {
  yield takeLatest(groupTypes.FETCH_GROUPS_START, fetchGroups);
}

export function* deleteGroup(payload: string) {
  try {
    yield GroupService.delete(payload);
    yield put(fetchGroupsStart());
    yield ToastSwal.fire({
      title: 'Vellykket!',
      text: 'Gruppen er slettet.',
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

export function* updateGroup({ payload }: any) {
  try {
    yield GroupService.update(payload);
    yield put(fetchGroupsStart());
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

export function* onUpdateGroupStart() {
  yield takeLatest(groupTypes.UPDATE_GROUP_START, updateGroup);
}

export function* onDeleteGroupStart() {
  yield takeLatest(groupTypes.DELETE_GROUP_START, deleteGroup);
}

export default function* groupSagas() {
  yield all([call(onAddGroupStart), call(onFetchGroupStart), call(onFetchGroupsStart), call(onUpdateGroupStart), call(onDeleteGroupStart)]);
}
