import { Entity } from '@/types';

export type FilterDependency = Array<any>;

/**
 * Type of filters. The type decides how the filter interactions
 * are rendered.
 * @typedef FilterType
 */
export type FilterType = 'checkbox' | 'select' | 'text';

export interface FilterReference {}

/**
 * Interface for search filter
 * @interface <T extends Entity>
 */
export type SearchFilterType<T extends Entity> = {
  fields: Array<keyof T>;
};

/**
 * Interface for the type of filter
 * @interface FilterTypeInterface<T extends Entity>
 */
export type FilterTypeInterface<T extends Entity> = {
  [K in keyof T]?: {
    type: FilterType;
    field?: string;
    dependency: FilterDependency;
    label: string;
    postfix?: string;
  };
};

/**
 * Interface for the filter state
 * @interface FilterState
 */
export interface FilterState {
  search: Array<string>;
  [key: string]: Array<any>;
}

/**
 * Interface for filter functions
 * @interface FilterFunctions
 */
export interface FilterFunctions {
  [key: string]: (value: any) => boolean;
}

/**
 * Interface for filters
 * @interface FilterInterface
 */
export interface FilterInterface {
  initialFilterState: FilterState;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  filterFunctions: FilterFunctions;
}
