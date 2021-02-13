import { Entity } from '@/types';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { BaseState, IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

/**
 * @desc Type describing the Partner state.
 */
export type PartnerState = BaseState<PartnerEntity>;

/**
 * @desc Interface describing a Partner Entity.
 */
export interface PartnerEntity extends Entity {
  name: string;
  image: string;
  description: string;
  link: string;
}

/**
 * @desc Object containing the action types for the Partner state.
 */
export const PartnerActionTypes = {
  FETCH: generateAsyncAction('@@partner.FETCH'),
  CREATE: generateAsyncAction('@@partner.CREATE'),
  UPDATE: generateAsyncAction('@@partner.UPDATE'),
  DELETE: generateAsyncAction('@@partner.DELETE'),
  SET: generateAsyncAction('@@partner.SET'),
  CLEAR: '@@partner.CLEAR',
};

/**
 * @desc Interface for all the available Partner state actions.
 */
export interface PartnerActions {
  fetchPartners: () => IMetaAction;
  createPartner: (partner: PartnerEntity) => IPayloadMetaAction<PartnerEntity>;
  updatePartner: (partner: PartnerEntity) => IPayloadMetaAction<PartnerEntity>;
  deletePartner: (partner: PartnerEntity) => IPayloadMetaAction<PartnerEntity>;
  setPartner: (partner: PartnerEntity) => IPayloadAction<PartnerEntity>;
  clear: () => IMetaAction;
}

/**
 * @desc Interface describing all props and actions of PartnerState
 */
export interface PartnerPropsAll extends PartnerState, PartnerActions {}
