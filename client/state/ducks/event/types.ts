import { Entity } from '@/types';

import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import {
  BaseState,
  IMetaAction,
  IPayloadAction,
  IPayloadMetaAction,
  ObjectId,
} from '../../interface';
import { StudyFieldEntity } from '../studyfield/types';
import { MemberEntity } from '../member/types';

/**
 * @desc Type describing the Event state.
 */
export type EventState = BaseState<EventEntity>;

/**
 * @desc Interface describing a Event Entity.
 */
export interface EventEntity extends Entity {
  title: string;
  type: string;
  date: Date;
  starttime: Date;
  endtime?: Date;
  place: string;
  dining?: string;
  description: string;
  grades: string[];
  image: string;
  link: string;
  studyfields: StudyFieldEntity[] | null;
  member: MemberEntity | null;
  active: boolean;
}

/**
 * @desc Object containing the action types for the Event state.
 */
export const EventActionTypes = {
  FETCH: generateAsyncAction('@@event.FETCH'),
  FETCH_ONE: generateAsyncAction('@@event.FETCH_ONE'),
  CREATE: generateAsyncAction('@@event.CREATE'),
  UPDATE: generateAsyncAction('@@event.UPDATE'),
  DELETE: generateAsyncAction('@@event.DELETE'),
  SET: generateAsyncAction('@@event.SET'),
};

/**
 * @desc Interface for all the available Event state actions.
 */
export interface EventActions {
  fetchEvents: () => IMetaAction;
  fetchActiveEvents: (limit?: number) => IMetaAction;
  fetchEvent: (id: ObjectId) => IMetaAction;
  createEvent: (event: EventEntity) => IPayloadMetaAction<EventEntity>;
  updateEvent: (event: EventEntity) => IPayloadMetaAction<EventEntity>;
  deleteEvent: (event: EventEntity) => IPayloadMetaAction<EventEntity>;
  setEvent: (event: EventEntity) => IPayloadAction<EventEntity>;
}

/**
 * @desc Interface describing all props and actions of EventState
 */
export interface EventPropsAll extends EventState, EventActions {}
