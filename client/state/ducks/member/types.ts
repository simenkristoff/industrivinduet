import { Entity } from '@/types';

import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { BaseState, IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';
import { RoleEntity } from '../role/types';

/**
 * @desc Type describing the Member state.
 */
export type MemberState = BaseState<MemberEntity>;

/**
 * @desc Interface describing a Member Entity.
 */
export interface MemberEntity extends Entity {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  image?: string;
  role: RoleEntity | null;
}

/**
 * @desc Object containing the action types for the Member state.
 */
export const MemberActionTypes = {
  FETCH: generateAsyncAction('@@member.FETCH'),
  CREATE: generateAsyncAction('@@member.CREATE'),
  UPDATE: generateAsyncAction('@@member.UPDATE'),
  DELETE: generateAsyncAction('@@member.DELETE'),
  SET: generateAsyncAction('@@member.SET'),
};

/**
 * @desc Interface for all the available Member state actions.
 */
export interface MemberActions {
  fetchMembers: () => IMetaAction;
  createMember: (member: MemberEntity) => IPayloadMetaAction<MemberEntity>;
  updateMember: (member: MemberEntity) => IPayloadMetaAction<MemberEntity>;
  deleteMember: (member: MemberEntity) => IPayloadMetaAction<MemberEntity>;
  setMember: (member: MemberEntity) => IPayloadAction<MemberEntity>;
}

/**
 * @desc Interface describing all props and actions of MemberState
 */
export interface MemberPropsAll extends MemberState, MemberActions {}
