import { action } from 'typesafe-actions';

import { StudyFieldActionTypes, StudyFieldEntity } from '@/types';

/**
 * Fetch all StudyFields.
 */
export const fetchStudyFields = () =>
  action(StudyFieldActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/studyfields',
  });

/**
 * Create a new StudyField.
 * @param {StudyFieldEntity} data the StudyField to create.
 */
export const createStudyField = (data: StudyFieldEntity) =>
  action(StudyFieldActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/studyfields',
  });

/**
 * Update a StudyField.
 * @param {StudyFieldEntity} data the StudyField instance with updated data.
 */
export const updateStudyField = (data: StudyFieldEntity) =>
  action(StudyFieldActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/studyfields/${data._id}`,
  });

/**
 * Delete StudyField.
 * @param {StudyFieldEntity} data the StudyField instance to delete.
 */
export const deleteStudyField = (data: StudyFieldEntity) =>
  action(StudyFieldActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/studyfields/${data._id}`,
  });

/**
 * Set StudyField.
 * @param {StudyFieldEntity} data the StudyField instance to set.
 */
export const setStudyField = (data: StudyFieldEntity) =>
  action(StudyFieldActionTypes.SET.START, data);

/**
 * Clears StudyField state
 */
export const clear = () => action(StudyFieldActionTypes.CLEAR);
