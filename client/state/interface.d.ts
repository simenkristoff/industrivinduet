import { Action, PayloadAction, PayloadMetaAction, TypeConstant } from 'typesafe-actions';

import { AuthState } from './ducks/auth/types';
import { ContentState } from './ducks/content/types';
import { EventState } from './ducks/event/types';
import { GroupState } from './ducks/group/types';
import { JobState } from './ducks/job/types';
import { MediaState } from './ducks/media/types';
import { MemberState } from './ducks/member/types';
import { OptionState } from './ducks/option/types';
import { PartnerState } from './ducks/partner/types';
import { RoleState } from './ducks/role/types';
import { StudyFieldState } from './ducks/studyfield/types';
import { UserState } from './ducks/user/types';

/**
 * @desc Type of state which allows for generic CRUD-actions.
 */
export type BaseState<T extends Entity> = {
  byId: T | {};
  readonly data: T[];
  readonly loading: boolean;
  readonly errors: Array<String>;
};

/**
 * @desc Interface for the store of states which allows for CRUD-management.
 */
export interface IRootState {
  content: ContentState;
  studyfield: StudyFieldState;
  partner: PartnerState;
  group: GroupState;
  role: RoleState;
  member: MemberState;
  user: UserState;
  event: EventState;
  job: JobState;
}

/**
 * @desc Interface for the applications store.
 */
export interface IApplicationState extends IRootState {
  options: OptionState;
  auth: AuthState;
  media: MediaState;
}

/**
 * @desc Type async actions has three states: START, SUCCESS, ERROR.
 */
export type AsyncActionType = {
  START: string;
  SUCCESS: string;
  ERROR: string;
};

/**
 * @desc Type Object Id from entities from database.
 */
export type ObjectId = string;

/**
 * @desc Type base entity of which all other entities is an extension of.
 */
export interface Entity {
  _id: ObjectId;
}

/**
 * @desc Type of meta-data.
 */
export type IMeta = any;

/**
 * @desc Type of meta action which allows for an action type and meta-data.
 */
export type MetaAction<TType extends TypeConstant, TMeta> = {
  type: TType;
  meta: TMeta;
};

/**
 * @desc Interface of meta action which allows for an action type and meta-data.
 */
export interface IMetaAction extends MetaAction<TypeConstant, IMeta> {}

/**
 * @desc Interface of payload action which allows for an action type and payload.
 */
export interface IPayloadAction<TPayload> extends PayloadAction<TypeConstant, TPayload> {}

/**
 * @desc Interface of payload meta action which allows for an action type, payload and meta-data.
 */
export interface IPayloadMetaAction<TPayload>
  extends PayloadMetaAction<TypeConstant, TPayload, IMeta> {}

export interface IReducerAction<TPayload>
  extends Action<TypeConstant>,
    PayloadAction<TypeConstant, TPayload> {}

export type Reducer = any;
