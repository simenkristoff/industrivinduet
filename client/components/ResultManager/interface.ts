import { FormInstance } from 'antd/lib/form';

import { Entity, FilterTypeInterface } from '@/types';

export interface ResultItemInterface<T extends Entity> {
  data: T;
  className?: string;
}

export interface ResultHeaderInterface {
  title: string;
  onSearchFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ResultContentInterface<T extends Entity> {
  data: T[];
  dataItem: React.FC<ResultItemInterface<T>>;
  loading: boolean;
}

export interface ResultFilterInterface<T extends Entity> {
  originalSize: number;
  filteredSize: number;
  filterTypes: FilterTypeInterface<T>;
  onFilterChange: (changedFields: Array<any>, allFields: Array<any>) => void;
  onFilterReset: (form: FormInstance<T>) => void;
}

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
