import React from 'react';
import { Layout } from 'antd';
import { SearchInput } from '@/components/SearchInput';

import { ResultHeaderInterface } from './interface';

export const ResultHeader: React.FC<ResultHeaderInterface> = ({
  title,
  onSearchFilterChange,
}: ResultHeaderInterface) => {
  return (
    <header className='result-header is-ghost'>
      <h1 className='result-title'>{title}</h1>
      <SearchInput onChange={onSearchFilterChange} />
    </header>
  );
};
