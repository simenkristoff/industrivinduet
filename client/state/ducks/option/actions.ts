import { action } from 'typesafe-actions';
import { OptionActionTypes, OptionEntity } from '@/types';

/**
 * @desc Fetch Options.
 */
export const fetchOptions = () =>
  action(OptionActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/options',
  });

/**
 * @desc Update Options.
 * @param {OptionEntity} data the Option instance with updated data.
 */
export const updateOptions = (data: OptionEntity) =>
  action(OptionActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/options`,
  });

/**
 * @desc Reset Options.
 */
export const resetOptions = () =>
  action(OptionActionTypes.RESET.START, [], {
    method: 'delete',
    route: `api/options`,
  });
