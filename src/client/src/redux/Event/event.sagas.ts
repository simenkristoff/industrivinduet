import * as Eff from 'redux-saga/effects';
import EventService from '../../service/event.service';
import eventTypes from './event.types';
import { setEvents, fetchEventsStart, setEvent } from './event.actions';

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

export function* addEvent({ payload }: any) {
  try {
    yield EventService.create({
      ...payload,
    });
    yield put(fetchEventsStart());
    yield ToastSwal.fire({
      title: 'Vellykket!',
      text: 'Arrangementet er lagt til.',
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

export function* onAddEventStart() {
  yield takeLatest(eventTypes.ADD_NEW_EVENT_START, addEvent);
}

export function* fetchEvent(payload: string) {
  try {
    const event = yield EventService.find(payload);
    yield put(setEvent(event));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchEventStart() {
  yield takeLatest(eventTypes.FETCH_EVENT_START, fetchEvent);
}

export function* fetchEvents() {
  try {
    const events = yield EventService.findAll();
    yield put(setEvents(events));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchEventsStart() {
  yield takeLatest(eventTypes.FETCH_EVENTS_START, fetchEvents);
}

export function* deleteEvent(payload: string) {
  try {
    yield EventService.delete(payload);
    yield put(fetchEventsStart());
    yield ToastSwal.fire({
      title: 'Vellykket!',
      text: 'Arrangementet er slettet.',
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

export function* updateEvent({ payload }: any) {
  try {
    yield EventService.update(payload);
    yield put(fetchEventsStart());
    yield ToastSwal.fire({
      title: 'Vellykket!',
      text: 'Arrangementet er oppdatert.',
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

export function* onUpdateEventStart() {
  yield takeLatest(eventTypes.UPDATE_EVENT_START, updateEvent);
}

export function* onDeleteEventStart() {
  yield takeLatest(eventTypes.DELETE_EVENT_START, deleteEvent);
}

export default function* eventSagas() {
  yield all([call(onAddEventStart), call(onFetchEventStart), call(onFetchEventsStart), call(onUpdateEventStart), call(onDeleteEventStart)]);
}
