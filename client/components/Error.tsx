import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
interface IProps {
  errors: Array<String>;
  display?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const Error: React.FC<IProps> = ({ errors, display, className, align }: IProps) => {
  const classes = ['error-message'];
  if (className) classes.push(className);
  if (align) classes.push(`text-${align}`);

  if (errors.length < 1) return null;

  return (
    <div className={classes.toString().replace(',', ' ')}>
      {errors &&
        errors.map((error, index) => (
          <span key={index}>
            <InfoCircleOutlined />
            &nbsp;{error}
          </span>
        ))}
    </div>
  );
};

Error.defaultProps = {
  display: true,
};
