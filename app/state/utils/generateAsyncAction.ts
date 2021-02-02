import { AsyncActionType } from '../interface';

export const generateAsyncAction = (name: string): AsyncActionType => ({
  START: `${name}.START`,
  SUCCESS: `${name}.SUCCESS`,
  ERROR: `${name}.ERROR`,
});
