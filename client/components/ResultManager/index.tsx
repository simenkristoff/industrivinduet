import React from 'react';
import { Layout } from 'antd';
import { Entity, ResultManagerInterface } from '@/types';

import { ResultContent } from './ResultContent';
import { ResultFilter } from './ResultFilter';
import { ResultHeader } from './ResultHeader';

export const ResultManager = <T extends Entity>(props: ResultManagerInterface<T>): JSX.Element => {
  const {
    title,
    originalSize,
    data,
    dataItem,
    filterTypes,
    onSearchFilterChange,
    onFilterChange,
    onFilterReset,
  } = props;

  const filterProps = {
    originalSize,
    filteredSize: data.length,
    filterTypes,
    onFilterChange,
    onFilterReset,
  };

  const headerProps = {
    title,
    onSearchFilterChange,
  };

  const contentProps = {
    data,
    dataItem,
  };

  return (
    <Layout hasSider className='result-manager is-ghost'>
      <ResultFilter {...filterProps} />
      <Layout className='result-wrapper is-ghost'>
        <ResultHeader {...headerProps} />
        <ResultContent {...contentProps} />
      </Layout>
    </Layout>
  );
};

export default ResultManager;
