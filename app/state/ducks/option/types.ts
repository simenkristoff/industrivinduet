import { Entity } from '@/types';

import { generateAsyncAction } from '../../utils';
import { IMetaAction, IPayloadMetaAction } from '../../interface';

/**
 * @desc Type describing the Option state.
 * @type
 */
export type OptionState = {
  readonly general: GeneralOptions;
  readonly event: EventOptions;
  readonly job: JobOptions;
  readonly socials: SocialOptions;
  readonly loading: boolean;
  readonly errors: Array<String>;
};

/**
 * Interface describing the Detail Options.
 * @interface
 */
export interface GeneralOptions {
  sitename: string;
  email: string;
  address: string;
  phone?: string;
  organization: string;
  about: string;
}

/**
 * Interface describing the Event Options.
 * @interface
 */
export interface EventOptions {
  homepage: {
    displayEvents: boolean;
    numberOfEvents: number;
  };
  eventTypes: Array<string>;
}

/**
 * Interface describing the Job Options.
 * @interface
 */
export interface JobOptions {
  homepage: {
    displayJobs: boolean;
    numberOfJobs: number;
  };
  jobTypes: Array<string>;
}

/**
 * Interface describing the Social Options.
 * @interface
 */
export interface SocialOptions {
  facebook: {
    name: string;
    link: string;
  };
  instagram: {
    name: string;
    link: string;
  };
  linkedin: {
    name: string;
    link: string;
  };
}

/**
 * Interface describing a Option Entity.
 * @interface
 */
export interface OptionEntity extends Entity {
  details: GeneralOptions;
  event: EventOptions;
  job: JobOptions;
  socials: SocialOptions;
}

/**
 * Object containing the action types for the Option state.
 */
export const OptionActionTypes = {
  FETCH: generateAsyncAction('@@option.FETCH'),
  UPDATE: generateAsyncAction('@@option.UPDATE'),
  RESET: generateAsyncAction('@@option.RESET'),
};

/**
 * Interface for all the available Option state actions.
 * @interface
 */
export interface OptionActions {
  fetchOptions: () => IMetaAction;
  updateOptions: (option: OptionEntity) => IPayloadMetaAction<OptionEntity>;
  resetOptions: () => IMetaAction;
}

/**
 * Interface describing all props and actions of OptionState
 * @interface
 */
export interface OptionPropsAll extends OptionState, OptionActions {}
