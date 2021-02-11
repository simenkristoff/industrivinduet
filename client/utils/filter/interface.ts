import { Entity } from '@/types';

export type FilterDependency = Array<any>;

export type FilterType = 'checkbox' | 'select' | 'text';

export interface FilterReference {}

export type SearchFilterType<T extends Entity> = {
  fields: Array<keyof T>;
};

export type FilterTypeInterface<T extends Entity> = {
  [K in keyof T]?: {
    type: FilterType;
    field?: string;
    dependency: FilterDependency;
    label: string;
    postfix?: string;
  };
};

export interface FilterState {
  search: Array<string>;
  [key: string]: Array<any>;
}

export interface FilterFunctions {
  [key: string]: (value: any) => boolean;
}

export interface FilterInterface {
  initialFilterState: FilterState;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  filterFunctions: FilterFunctions;
}
