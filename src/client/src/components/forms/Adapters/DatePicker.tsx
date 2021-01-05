import React, { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { DatePicker as DatePickerInput, Switch } from 'antd';
import moment from 'moment';
import 'moment/locale/nb';

interface IProps extends FieldRenderProps<any, HTMLElement> {
  className?: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  switch?: boolean;
}

export const DatePicker: React.FC<IProps> = ({ input, meta, ...props }: IProps) => {
  const [inputDisabled, setInputDisabled] = useState(meta.initial ? true : false);
  const hasError = meta.error && meta.touched;
  const { onChange, onBlur, onFocus, ...restInput } = input;
  return (
    <div className={props.className ? props.className : 'form-group'}>
      {props.label && (
        <label className='col-form-label' htmlFor={input.name}>
          {props.label}
          {props.switch && (
            <span key='space'>
              &nbsp;
              <Switch key='switch' defaultChecked={inputDisabled} onChange={(e) => setInputDisabled(!inputDisabled)} />
            </span>
          )}
        </label>
      )}
      <DatePickerInput
        placeholder={props.placeholder}
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        format={'ll'}
        onChange={(event) => input.onChange(event)}
        onBlur={(event) => input.onBlur(event)}
        onFocus={(event) => input.onFocus(event)}
        defaultValue={input.value ? moment(input.value) : undefined}
        disabled={props.switch ? !inputDisabled : props.disabled}
        inputReadOnly={!!props.readOnly}
        {...restInput}
      />
      {hasError && <small className='form-error text-danger'>{meta.error}</small>}
    </div>
  );
};

DatePicker.defaultProps = {
  placeholder: 'Velg dato',
  readOnly: false,
  disabled: false,
  switch: false,
};

export default DatePicker;
