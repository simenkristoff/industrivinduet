import { useState } from 'react';
import _ from 'lodash';
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

export function initializeFilters<T extends Entity>(
  filterTypes: FilterTypeInterface<T>,
  searchFilterTypes?: SearchFilterType<T>,
): FilterInterface {
  let initialFilterState: FilterState = { search: [] };
  let filterFunctions: FilterFunctions = {};
  if (searchFilterTypes) {
    initialFilterState = { ...initialFilterState, search: [] };

    // Handle Search Filter
    Object.entries(searchFilterTypes).map(([key, values]) => {
      const vals = values;
      filterFunctions = {
        ...filterFunctions,
        search: (item: any) => {
          let found = false;
          found = values.some((value): boolean => {
            let field = item[value as string];
            if (Array.isArray(field)) {
              field = field.join(' ');
            }

            return field.toLowerCase().includes(filterState.search.toString().toLowerCase());
          });

          return found;
        },
      };
    });
  }
  // Handle Filter for Select, Checkbox
  Object.entries(filterTypes).map(([key, value]) => {
    switch (value?.type) {
      case 'select':
        initialFilterState = { ...initialFilterState, [key]: [''] };
        filterFunctions = {
          ...filterFunctions,
          [key]: (val: string) => val.toLowerCase() === filterState[key].toString().toLowerCase(),
        };
        break;
      case 'checkbox':
        initialFilterState = { ...initialFilterState, [key]: [] };
        filterFunctions = {
          ...filterFunctions,
          [key]: (val: string[]) =>
            val.some((element: any) => {
              const field = value?.field;
              const condition = field !== undefined ? element['_id'] : element;

              return filterState[key].includes(condition);
            }),
        };
        break;
      case 'text':
      default:
        return true;
    }
  });
  const [filterState, setFilterState] = useState<FilterState>({ ...initialFilterState });

  return { initialFilterState, filterState, setFilterState, filterFunctions };
}

export function filterArray(array: Array<any>, filters: FilterFunctions, filterState: FilterState) {
  const filterKeys = Object.keys(filters);

  return array.filter((item) => {
    return filterKeys.every((key, index) => {
      if (filterState[key].length < 1 || filterState[key][0].length < 1) return true;
      if (typeof filters[key] !== 'function') return true;
      if (key === 'search') return filters[key](item);

      return filters[key](item[key]);
    });
  });
}
