import React from 'react';
import { Spin } from 'antd';

interface IProps {
  loading: boolean;
  centered?: boolean;
  className?: string;
}

export const Spinner: React.FC<IProps> = ({ loading, centered, className }: IProps) => {
  if (!loading) return null;
  const classes: string[] = ['spinner'];
  if (centered) classes.push('spinner-centered');
  if (className) {
    className.split(' ').forEach((_c) => {
      classes.push(_c);
    });
  }

  return <Spin className={classes.join(' ')} />;
};

Spinner.defaultProps = {
  centered: false,
};
