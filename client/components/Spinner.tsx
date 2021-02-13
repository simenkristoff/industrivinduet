import React from 'react';
import { Spin } from 'antd';

interface IProps {
  loading: boolean;
}

export const Spinner: React.FC<IProps> = ({ loading }: IProps) => {
  if (!loading) return null;

  return <Spin className='spinner' />;
};
