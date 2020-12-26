import {takeLatest, call, all, put} from 'redux-saga/effects';
import MemberService from './../../service/member.service';
import memberTypes from './member.types';
import {setMembers, fetchMembersStart, setMember, fetchMemberStart} from './member.actions';

// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Toast
const ToastSwal = withReactContent(Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    position: 'top-end',
}));

export function* addMember({payload}) {
    try {
        yield MemberService.create({
            ...payload
        });
        yield put(
            fetchMembersStart()
        );
        yield ToastSwal.fire({
            title: "Vellykket!",
            text: "Medlemmet er lagt til.",
            icon: "success"
        });
    } catch(err) {
        yield ToastSwal.fire({
            title: "Feil!",
            text: "En feil har oppstått.",
            icon: "error"
        });
        console.log(err);
    }
};

export function* onAddMemberStart() {
    yield takeLatest(memberTypes.ADD_NEW_MEMBER_START, addMember);
};

export function* fetchMember({payload}) {
    try {
        const member = yield MemberService.find(payload);
        yield put(
            setMember(member)
        );
    } catch(err) {
        console.log(err);
    }
};

export function* onFetchMemberStart() {
    yield takeLatest(memberTypes.FETCH_MEMBER_START, fetchMember);
};

export function* fetchMembers() {
    try {
        const members = yield MemberService.findAll();
        yield put(
            setMembers(members)
        );
    } catch(err) {
        console.log(err);
    }
}

export function* onFetchMembersStart() {
    yield takeLatest(memberTypes.FETCH_MEMBERS_START, fetchMembers);
};

export function* deleteMember({payload}) {
    try {
        yield MemberService.delete(payload);
        yield put(
            fetchMembersStart()
        );
        yield ToastSwal.fire({
            title: "Vellykket!",
            text: "Medlemmet er slettet.",
            icon: "success"
        });
    } catch(err) {
        yield ToastSwal.fire({
            title: "Feil!",
            text: "En feil har oppstått.",
            icon: "error"
        });
        console.log(err);
    }
};

export function* updateMember({payload}) {
    try {
        yield MemberService.update(payload);
        yield put(
            fetchMembersStart()
        );
        yield ToastSwal.fire({
            title: "Vellykket!",
            text: "Medlemmet er oppdatert.",
            icon: "success"
        });
    } catch(err) {
        yield ToastSwal.fire({
            title: "Feil!",
            text: "En feil har oppstått.",
            icon: "error"
        });
        console.log(err);
    }
}

export function* onUpdateMemberStart() {
    yield takeLatest(memberTypes.UPDATE_MEMBER_START, updateMember);
}

export function* onDeleteMemberStart() {
    yield takeLatest(memberTypes.DELETE_MEMBER_START, deleteMember);
};

export default function* memberSagas() {
    yield all([
        call(onAddMemberStart),
        call(onFetchMemberStart),
        call(onFetchMembersStart),
        call(onUpdateMemberStart),
        call(onDeleteMemberStart)
    ]);
};