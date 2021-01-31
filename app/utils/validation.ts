import _ from 'lodash';
import { Entity } from '@/types';

/**
 *
 * Function to verify wether an input value is unique or not.
 * The function validates input data against an array of previously
 * stored values.
 *
 * @param initialState the initial state of the form
 * @param currentValue the current value of the field to validate
 * @param lookupData the data to lookup for verifying an unique value
 * @param selector the selector path i.e ['user', 'username'] or 'user.username'
 * @param isExact wether to fail on exact match, usually used for Strings
 * @param message the error message
 *
 * @returns Promise
 */
export function uniqueValue<T extends Entity>(
  initialState: T | {},
  currentValue: any,
  lookupData: Array<T>,
  selector: string | Array<String>,
  isExact: boolean = false,
  message: string,
): Promise<any> {
  if (!currentValue) return Promise.resolve();
  if (typeof selector !== 'string') {
    selector = selector.join('.');
  }
  const oVal = _.get(initialState, selector);
  const mappedData = _.map(lookupData, selector).filter((value) => {
    if (typeof value === 'string' && typeof oVal === 'string') {
      return value.toLowerCase() === oVal.toLowerCase() ? false : true;
    } else {
      return value === oVal ? false : true;
    }
  });

  if (isExact && !mappedData.some((value) => value.toLowerCase() === currentValue.toLowerCase())) {
    return Promise.resolve();
  }
  if (!isExact && !mappedData.includes(currentValue)) {
    return Promise.resolve();
  }

  return Promise.reject(message);
}
