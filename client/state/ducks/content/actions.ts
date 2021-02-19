import { action } from 'typesafe-actions';

import { ContentActionTypes, ContentEntity } from '@/types';

/**
 * Fetch all Contents.
 */
export const fetchContents = () =>
  action(ContentActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/contents',
  });

/**
 * Create a new Content.
 * @param {ContentEntity} data the Content to create.
 */
export const createContent = (data: ContentEntity) =>
  action(ContentActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/contents',
  });

/**
 * Update a Content.
 * @param {ContentEntity} data the Content instance with updated data.
 */
export const updateContent = (data: ContentEntity) =>
  action(ContentActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/contents/${data._id}`,
  });

/**
 * Delete Content.
 * @param {ContentEntity} data the Content instance to delete.
 */
export const deleteContent = (data: ContentEntity) =>
  action(ContentActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/contents/${data._id}`,
  });

/**
 * Set Content.
 * @param {ContentEntity} data the Content instance to set.
 */
export const setContent = (data: ContentEntity) => action(ContentActionTypes.SET.START, data);

/**
 * Clears Content state
 */
export const clear = () => action(ContentActionTypes.CLEAR);
