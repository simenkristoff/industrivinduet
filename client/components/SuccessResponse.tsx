import React from 'react';
import { Result } from 'antd';

import { ApiResponse } from '@/types';

interface IProps {
  response: ApiResponse | null;
  align?: 'left' | 'center' | 'right';
  className?: string;
  extra?: React.ReactNode;
}

/**
 * Displays an success message if a success message is received from backend.
 */
export const SuccessResponse: React.FC<IProps> = ({
  response,
  align,
  className,
  extra,
}: IProps) => {
  const classes = ['success-message'];
  if (align) classes.push(`text-${align}`);
  if (className) classes.push(className);

  function render() {
    if (response && response.status === 'success') {
      return <Result title={response.message} extra={extra} />;
    }

    return null;
  }

  return <div className={classes.toString().replace(',', ' ')}>{render()}</div>;
};

SuccessResponse.defaultProps = {
  align: 'center',
};
