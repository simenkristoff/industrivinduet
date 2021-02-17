import { Entity } from '@/types';
import { generateAsyncAction } from '@/state/utils/generateAsyncAction';

import { BaseState, IMetaAction, IPayloadAction, IPayloadMetaAction } from '../../interface';

/**
 * Type describing the StudyField state.
 */
export type StudyFieldState = BaseState<StudyFieldEntity>;

/**
 * Interface describing a StudyField Entity.
 */
export interface StudyFieldEntity extends Entity {
  name: string;
  abbr: string;
  description: string;
  link: string;
}

/**
 * Object containing the action types for the StudyField state.
 */
export const StudyFieldActionTypes = {
  FETCH: generateAsyncAction('@@studyfield.FETCH'),
  CREATE: generateAsyncAction('@@studyfield.CREATE'),
  UPDATE: generateAsyncAction('@@studyfield.UPDATE'),
  DELETE: generateAsyncAction('@@studyfield.DELETE'),
  SET: generateAsyncAction('@@studyfield.SET'),
  CLEAR: '@@studyfield.CLEAR',
};

/**
 * Interface for all the available StudyField state actions.
 */
export interface StudyFieldActions {
  fetchStudyFields: () => IMetaAction;
  createStudyField: (studyfield: StudyFieldEntity) => IPayloadMetaAction<StudyFieldEntity>;
  updateStudyField: (studyfield: StudyFieldEntity) => IPayloadMetaAction<StudyFieldEntity>;
  deleteStudyField: (studyfield: StudyFieldEntity) => IPayloadMetaAction<StudyFieldEntity>;
  setStudyField: (studyfield: StudyFieldEntity) => IPayloadAction<StudyFieldEntity>;
  clear: () => IMetaAction;
}

/**
 * Interface describing all props and actions of StudyFieldState
 */
export interface StudyFieldPropsAll extends StudyFieldState, StudyFieldActions {}
