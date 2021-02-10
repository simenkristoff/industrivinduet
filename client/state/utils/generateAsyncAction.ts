import { AsyncActionType } from '@/types';

export const generateAsyncAction = (name: string): AsyncActionType => ({
  START: `${name}.START`,
  SUCCESS: `${name}.SUCCESS`,
  ERROR: `${name}.ERROR`,
});
