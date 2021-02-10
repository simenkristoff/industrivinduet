import { action } from 'typesafe-actions';
import { PartnerActionTypes, PartnerEntity } from '@/types';

/**
 * @desc Fetch all Partners.
 */
export const fetchPartners = () =>
  action(PartnerActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/partners',
  });

/**
 * @desc Create a new Partner.
 * @param {PartnerEntity} data the Partner to create.
 */
export const createPartner = (data: PartnerEntity) =>
  action(PartnerActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/partners',
  });

/**
 * @desc Update a Partner.
 * @param {PartnerEntity} data the Partner instance with updated data.
 */
export const updatePartner = (data: PartnerEntity) =>
  action(PartnerActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/partners/${data._id}`,
  });

/**
 * @desc Delete Partner.
 * @param {PartnerEntity} data the Partner instance to delete.
 */
export const deletePartner = (data: PartnerEntity) =>
  action(PartnerActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/partners/${data._id}`,
  });

/**
 * @desc Set Partner.
 * @param {PartnerEntity} data the Partner instance to set.
 */
export const setPartner = (data?: PartnerEntity) => action(PartnerActionTypes.SET.START, data);
