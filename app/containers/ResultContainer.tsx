import React, { useCallback } from 'react';
import { Entity } from '@/types';
import { ResultItemInterface } from '@/components/ResultManager/interface';
import { ResultManager } from '@/components/ResultManager';
import {
  filterArray,
  FilterTypeInterface,
  initializeFilters,
  SearchFilterType,
} from '@/utils/filters';
import { FormInstance } from 'antd/lib/form';

interface IProps<T extends Entity> {
  title: string;
  data: T[];
  dataItem: React.FC<ResultItemInterface<T>>;
  filterTypes: FilterTypeInterface<T>;
  searchFilterTypes?: SearchFilterType<T>;
}

export const ResultContainer = <T extends Entity>(props: IProps<T>): JSX.Element => {
  const { title, data, dataItem, filterTypes, searchFilterTypes } = props;
  const { initialFilterState, filterState, setFilterState, filterFunctions } = initializeFilters<T>(
    filterTypes,
    searchFilterTypes,
  );

  const handleFilterSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newState: any = filterState;
    newState[name] = value;
    setFilterState({ ...newState });
  };

  const handleFilterChange = (changedFields: Array<any>, allFields: Array<any>) => {
    const newState = filterState;
    newState[changedFields[0].name[0]] = changedFields[0].value;
    setFilterState({ ...newState });
  };

  const handleFilterReset = (form: FormInstance<T>) => {
    form.resetFields();
    setFilterState(initialFilterState);
  };

  const mapStateToProps = {
    title,
    originalSize: data.length,
    data: filterArray(data, filterFunctions, filterState),
    dataItem,
    filterTypes,
  };

  const mapDispatchToProps = {
    onSearchFilterChange: useCallback((e) => handleFilterSearchChange(e), []),
    onFilterChange: useCallback(
      (changedFields, allFields) => handleFilterChange(changedFields, allFields),
      [],
    ),
    onFilterReset: useCallback((form) => handleFilterReset(form), []),
  };

  return <ResultManager {...mapStateToProps} {...mapDispatchToProps} />;
};
