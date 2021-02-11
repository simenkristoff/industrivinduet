import { useState } from 'react';
import _ from 'lodash';

import {
  Entity,
  FilterFunctions,
  FilterInterface,
  FilterState,
  FilterTypeInterface,
  SearchFilterType,
} from '@/types';

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
