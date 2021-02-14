import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  CollectionInterface,
  CollectionKeys,
  SwalActionInterface,
  SwalActionKeys,
  SwalMediaActionInterface,
  SwalMediaActionKeys,
} from './interface';

const tbl: { [key: string]: string } = {
  n: 'denne',
  t: 'dette',
  e: 'disse',
};

const actionSuccess = withReactContent(
  Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'Vellykket!',
    position: 'top-end',
    timer: 3000,
    showCloseButton: false,
    showConfirmButton: false,
  }),
);

const actionError = withReactContent(
  Swal.mixin({
    toast: true,
    icon: 'error',
    title: 'Feil!',
    position: 'top-end',
    timer: 3000,
    showCloseButton: false,
    showConfirmButton: false,
  }),
);

const actionVerify = withReactContent(
  Swal.mixin({
    title: 'Er du sikker?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#096dd9',
    cancelButtonColor: '#ff4d4f',
    confirmButtonText: 'Fortsett',
    cancelButtonText: 'Avbryt',
  }),
);

export const collections: CollectionInterface = {
  OPTION: 'Innstillingene',
  CONTENT: 'Siden',
  STUDYFIELD: 'Studieretningen',
  PARTNER: 'Samarbeidspartneren',
  GROUP: 'Gruppen',
  ROLE: 'Stillingen',
  MEMBER: 'Medlemmet',
  USER: 'Brukeren',
  EVENT: 'Arrangementet',
  JOB: 'Stillingsannonsen',
};

const actions: SwalActionInterface = {
  CREATE: 'lagt til',
  UPDATE: 'oppdatert',
  DELETE: 'slettet',
  RESET: 'tilbakestilt',
};

const mediaActions: SwalMediaActionInterface = {
  UPLOAD: 'Filen ble lastet opp',
  DELETE: 'Filen/mappen ble slettet',
  CREATE: 'Ny mappe ble lagt til',
  UPDATE: 'Mappen ble oppdatert',
};

export function fireActionSuccess(key: CollectionKeys, action: SwalActionKeys) {
  actionSuccess.fire({ text: `${collections[key]} ble ${actions[action]}!` });
}

export function fireActionError() {
  actionError.fire({ text: 'Noe gikk galt...' });
}

export async function fireActionVerify(key: CollectionKeys) {
  const _i: string = collections[key].toLowerCase();
  const _k: string = tbl[_i.substr(_i.length - 1, 1)];

  return actionVerify.fire({ text: `Du vil ikke kunne gjenopprette ${_k} ${_i} senere.` });
}

export function fireMediaActionSuccess(action: SwalMediaActionKeys) {
  actionSuccess.fire({ text: mediaActions[action] });
}

export async function fireFolderDeleteVerify() {
  return actionVerify.fire({ text: 'Mappen og filene vil ikke kunne gjenopprettes senere.' });
}
