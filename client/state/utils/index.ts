import _ from 'lodash';
import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';

import { Entity } from '@/types';

export { default as apiCaller } from './apiCaller';
export { generateAsyncAction as generateAsyncAction } from './generateAsyncAction';

/**
 * Merges object with payload from an action
 * @param {T} object the object to merge
 * @param {Action<TypeConstant> & PayloadAction<TypeConstant, T>} action the action with payload
 */
export function mergeObject<T extends Object>(
  object: T,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, T>,
) {
  return _.merge(object, action.payload);
}

/**
 * Updates a given array with data recieved from an api call.
 * @param {T[]} array the array to update
 * @param {Action} action action type with payload
 * @returns {T[]} updated array
 */
export function updateObjectInArray<T extends Entity>(
  array: T[],
  action: Action<TypeConstant> & PayloadAction<TypeConstant, T>,
): T[] {
  return array.map((item) => {
    if (item._id !== action.payload._id) {
      return item;
    }

    return { ...item, ...action.payload };
  });
}

/**
 * Deletes an object recieved from an api call from a given array.
 * @param {T[]} array the array to update
 * @param {Action} action action type with payload
 * @returns {T[]} array without deleted object
 */
export function deleteObjectInArray<T>(
  array: T[],
  action: Action<TypeConstant> & PayloadAction<TypeConstant, T>,
): T[] {
  return _.without(array, action.payload);
}
