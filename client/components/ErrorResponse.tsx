import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Result } from 'antd';

import { ApiResponse } from '@/types';

interface IProps {
  response: ApiResponse | null;
  className?: string;
  align?: 'left' | 'center' | 'right';
  jumbotron?: boolean;
}

export const ErrorResponse: React.FC<IProps> = ({
  response,
  className,
  align,
  jumbotron,
}: IProps) => {
  const classes = ['error-message'];
  if (className) classes.push(className);
  if (align) classes.push(`text-${align}`);

  function render() {
    if (response && response.status === 'error') {
      if (jumbotron) {
        return <Result status='error' title={response.message} />;
      }

      return (
        <span>
          <InfoCircleOutlined />
          &nbsp;{response.message}
        </span>
      );
    }

    return null;
  }

  return <div className={classes.toString().replace(',', ' ')}>{render()}</div>;
};

ErrorResponse.defaultProps = {
  align: 'center',
  jumbotron: false,
};
