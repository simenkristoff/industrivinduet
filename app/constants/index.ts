export { default as FormMessage } from './formMessages';
export { default as OptionMessage } from './optionMessages';
export { default as Bytes } from './bytes';

export enum userTypes {
  'USER' = 'Bruker',
  'ADMIN' = 'Admin',
}
export const roleTypes: string[] = ['Leder', 'Nestleder', 'Medlem'];
export const grades: string[] = ['1', '2', '3', '4', '5'];
export enum roleValuesEnum {
  'Leder' = 1,
  'Nestleder' = 2,
  'Medlem' = 3,
}
