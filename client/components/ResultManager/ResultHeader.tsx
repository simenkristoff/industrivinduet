import React from 'react';
import { ResultHeaderInterface } from '@/types';

import { SearchInput } from '@/components/SearchInput';

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
