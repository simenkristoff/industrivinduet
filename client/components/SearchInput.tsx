import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface IProps {
  name?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Search input component
 */
export const SearchInput: React.FC<IProps> = ({ name, placeholder, onChange }: IProps) => {
  return (
    <Input
      name={name}
      type='search'
      onChange={onChange}
      className='search-field'
      size='middle'
      placeholder={placeholder}
      prefix={<SearchOutlined />}
    />
  );
};

SearchInput.defaultProps = {
  name: 'search',
  placeholder: 'Søk',
};
