import { BaseState, Entity } from '@/state/interface';
import { FormInstance } from 'antd/lib/form';
import { ExpandableConfig, ColumnsType } from 'antd/lib/table/interface';

export interface AuthInterface {
  hasPermission: boolean;
}

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
 * @interface
 */
export interface DataFormInterface<T extends Entity> {
  form?: FormInstance<T>;
  data: T | {};
  editMode: boolean;
}

/**
 * Interface for the DataModal
 * @interface
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
 * @interface
 */
export interface DataListInterface<T extends Entity> extends CrudInterface<T> {}

/**
 * Interface for the DataHeader
 * @interface
 */
export interface DataHeaderInterface extends AuthInterface {
  name: {
    singular: String;
    plural: String;
  };
  toggle: () => void;
}
