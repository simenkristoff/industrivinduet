/**
 * Define the Collections in the database
 * @interface CollectionInterface
 */
export interface CollectionInterface {
  OPTION: string;
  CONTENT: string;
  STUDYFIELD: string;
  PARTNER: string;
  GROUP: string;
  ROLE: string;
  MEMBER: string;
  USER: string;
  EVENT: string;
  JOB: string;
}

/**
 * Type of Collection keys
 * @typedef CollectionKeys
 */
export type CollectionKeys = keyof CollectionInterface;

/**
 * Swal action types
 * @interface SwalActionInterface
 */
export interface SwalActionInterface {
  CREATE: string;
  UPDATE: string;
  DELETE: string;
  RESET: string;
}

/**
 * Swal action type keys
 * @typedef SwalActionKeys
 */
export type SwalActionKeys = keyof SwalActionInterface;

/**
 * Swal media action types
 * @interface SwalMediaActionInterface
 */
export interface SwalMediaActionInterface {
  UPLOAD: string;
  DELETE: string;
  CREATE: string;
  UPDATE: string;
}

/**
 * Swal media action type keys
 * @typedef SwalMediaActionKeys
 */
export type SwalMediaActionKeys = keyof SwalMediaActionInterface;
