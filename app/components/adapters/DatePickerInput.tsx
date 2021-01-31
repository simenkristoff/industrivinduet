import React from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/nb';

interface IProps {
  value?: string;
  onChange?: (value: any) => void;
}

export const DatePickerInput: React.FC<IProps> = ({ value = '', onChange }: IProps) => {
  const triggerChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleChange = (value: Moment, dateString: string) => {
    triggerChange(value.toISOString());
  };

  return (
    <DatePicker
      format={'ll'}
      onChange={(value: Moment | null, dateString: string) => handleChange(value!, dateString)}
      defaultValue={value ? moment(value) : undefined}
    />
  );
};
