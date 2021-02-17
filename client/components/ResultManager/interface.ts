import { FormInstance } from 'antd/lib/form';

import { Entity, FilterTypeInterface } from '@/types';

/**
 * Interface for the props of each item in the result list.
 * @interface ResultItemInterface<T extends Entity>
 */
export interface ResultItemInterface<T extends Entity> {
  data: T;
  className?: string;
}

/**
 * Interface for the header props
 * @interface ResultHeaderInterface
 */
export interface ResultHeaderInterface {
  title: string;
  onSearchFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Interface for the result content wrapper props.
 * @interface ResultContentInterface<T extends Entity>
 */
export interface ResultContentInterface<T extends Entity> {
  data: T[];
  dataItem: React.FC<ResultItemInterface<T>>;
  loading: boolean;
}

/**
 * Interface for the result filter.
 * @interface ResultFilterInterface<T extends Entity>
 */
export interface ResultFilterInterface<T extends Entity> {
  originalSize: number;
  filteredSize: number;
  filterTypes: FilterTypeInterface<T>;
  onFilterChange: (changedFields: Array<any>, allFields: Array<any>) => void;
  onFilterReset: (form: FormInstance<T>) => void;
}

/**
 * Interface for the wrapper props.
 * @interface ResultManagerInterface<T extends Entity>
 */
export interface ResultManagerInterface<T extends Entity> {
  title: string;
  data: T[];
  dataItem: React.FC<ResultItemInterface<T>>;
  originalSize: number;
  filterTypes: FilterTypeInterface<T>;
  loading: boolean;
  onSearchFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (changedFields: Array<any>, allFields: Array<any>) => void;
  onFilterReset: (form: FormInstance<T>) => void;
}
