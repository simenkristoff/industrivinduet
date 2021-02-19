import { action } from 'typesafe-actions';

import { OptionActionTypes, OptionEntity } from '@/types';
import optionData from '@/__mocks__/optionData';

import { clear, fetchOptions, updateOptions, resetOptions } from '../actions';

describe('option actions', () => {
  it('should call @@option.FETCH.START', () => {
    const expectedAction = action(OptionActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/options',
    });

    expect(fetchOptions()).toEqual(expectedAction);
  });

  it('should call @@option.UPDATE.START', () => {
    const payload: OptionEntity = optionData;
    const expectedAction = action(OptionActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/options`,
    });

    expect(updateOptions(payload)).toEqual(expectedAction);
  });

  it('should call @@option.RESET.START', () => {
    const expectedAction = action(OptionActionTypes.RESET.START, [], {
      method: 'delete',
      route: `api/options`,
    });

    expect(resetOptions()).toEqual(expectedAction);
  });

  it('should call @option.CLEAR', () => {
    const expectedAction = action(OptionActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
