import _ from 'lodash';
import { Action, PayloadAction, TypeConstant } from 'typesafe-actions';

import { Entity } from '@/types';

export { default as apiCaller } from './apiCaller';
export { generateAsyncAction as generateAsyncAction } from './generateAsyncAction';

export function mergeObject<T extends Object>(
  object: T,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, T>,
) {
  return _.merge(object, action.payload);
}

export function updateObjectInArray<T extends Entity>(
  array: T[],
  action: Action<TypeConstant> & PayloadAction<TypeConstant, T>,
) {
  return array.map((item) => {
    if (item._id !== action.payload._id) {
      return item;
    }

    return { ...item, ...action.payload };
  });
}

export function deleteObjectInArray<T>(
  array: T[],
  action: Action<TypeConstant> & PayloadAction<TypeConstant, T>,
) {
  return _.without(array, action.payload);
}
