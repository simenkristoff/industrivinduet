import { FormInstance } from 'antd/lib/form';
import { ExpandableConfig, ColumnsType } from 'antd/lib/table/interface';

import { BaseState, Entity, CollectionKeys } from '@/types';

/**
 * Interface for Auth permissions
 * @interface AuthInterface
 */
export interface AuthInterface {
  hasPermission: boolean;
}

/**
 * Interface describing the Crud Interface
 * @interface CrudInterface<T extends Entity>
 */
export interface CrudInterface<T extends Entity> {
  state: BaseState<T>;
  columns: ColumnsType<T>;
  expandable?: ExpandableConfig<T>;
  modal?: {
    width?: string | number;
  };
  name: {
    singular: String;
    plural: String;
  };
  collection: CollectionKeys;
  dataForm: React.FC<DataFormInterface<T>>;
  fetch: () => void;
  create: (arg0: T) => void;
  update: (arg0: T) => void;
  remove: (arg0: T) => void;
  set: (arg0: T | {}) => void;
  dependencies?: any;
  requireAdmin?: boolean;
}

/**
 * Interface for the DataForm
 * @interface DataFormInterface<T extends Entity>
 */
export interface DataFormInterface<T extends Entity> {
  form?: FormInstance<T>;
  data: T | {};
  editMode: boolean;
}

/**
 * Interface for the DataModal
 * @interface DataModalInterface<T extends Entity>
 */
export interface DataModalInterface<T extends Entity> {
  name: {
    singular: String;
    plural: String;
  };
  visible: boolean;
  width?: string | number;
  form: FormInstance<T>;
  data: T | {};
  editMode: boolean;
  dataForm: React.FC<DataFormInterface<T>>;
  submit: (values: T) => void;
  close: () => void;
}

/**
 * Interface for the DataList
 * @interface DataListInterface<T extends Entity>
 */
export interface DataListInterface<T extends Entity> extends CrudInterface<T> {}

/**
 * Interface for the DataHeader
 * @interface DataHeaderInterface
 */
export interface DataHeaderInterface extends AuthInterface {
  name: {
    singular: String;
    plural: String;
  };
  toggle: () => void;
}
