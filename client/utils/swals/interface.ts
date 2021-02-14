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

export type CollectionKeys = keyof CollectionInterface;

export interface SwalActionInterface {
  CREATE: string;
  UPDATE: string;
  DELETE: string;
  RESET: string;
}

export type SwalActionKeys = keyof SwalActionInterface;

export interface SwalMediaActionInterface {
  UPLOAD: string;
  DELETE: string;
  CREATE: string;
  UPDATE: string;
}

export type SwalMediaActionKeys = keyof SwalMediaActionInterface;
