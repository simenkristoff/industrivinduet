import {takeLatest, call, all, put} from 'redux-saga/effects';
import OptionService from './../../service/option.service';
import optionTypes from './option.types';
import {setOptions, fetchOptionsStart} from './option.actions';

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

export function* fetchOptions() {
    try {
        const options = yield OptionService.get();
        yield put(
            setOptions(options)
        );
    } catch(err) {
        console.log(err);
    }
};

export function* onFetchOptionsStart() {
    yield takeLatest(optionTypes.FETCH_OPTIONS_START, fetchOptions);
};

export function* updateOption({payload}) {
    try {
        yield OptionService.update(payload);
        yield put(
            fetchOptionsStart()
        );
        yield ToastSwal.fire({
            title: "Vellykket!",
            text: "Innstillingene er oppdatert.",
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

export function* onUpdateOptionStart() {
    yield takeLatest(optionTypes.UPDATE_OPTION_START, updateOption);
};

export function* resetAllOptions() {
    try {
        yield OptionService.resetAll();
        yield put(
            fetchOptionsStart()
        );
        yield ToastSwal.fire({
            title: "Vellykket!",
            text: "Innstillingene er tilbakestilt.",
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

export function* onResetAllOptionsStart() {
    yield takeLatest(optionTypes.RESET_ALL_OPTIONS_START, resetAllOptions);
}

export default function* optionSagas() {
    yield all([
        call(onFetchOptionsStart),
        call(onUpdateOptionStart),
        call(onResetAllOptionsStart)
    ]);
};