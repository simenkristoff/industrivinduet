import React from 'react';
import { TimePicker } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/nb';

interface IProps {
  value?: string;
  onChange?: (value: any) => void;
}

/**
 * Adapter for Ant Design TimePicker
 */
export const TimePickerInput: React.FC<IProps> = ({ value = '', onChange }: IProps) => {
  const triggerChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleChange = (value: Moment, dateString: string) => {
    triggerChange(value.toISOString());
  };

  return (
    <TimePicker
      format={'HH:mm'}
      onChange={(value: Moment | null, dateString: string) => handleChange(value!, dateString)}
      defaultValue={value ? moment(value) : undefined}
    />
  );
};
