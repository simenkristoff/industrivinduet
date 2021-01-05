import React, { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Switch } from 'antd';

interface IProps extends FieldRenderProps<any, HTMLElement> {
  options?: [];
  map?: {
    value?: string;
    name?: string;
  };
  defaultOption: string;
  className?: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  switch?: boolean;
}

const SelectInput: React.FC<IProps> = ({ input, meta, options, map, defaultOption, ...props }: IProps) => {
  const [inputDisabled, setInputDisabled] = useState(meta.initial ? true : false);
  const hasError = meta.error && meta.touched;

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

      <select
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        disabled={props.switch ? !inputDisabled : props.disabled}
        placeholder={props.placeholder}
        type={props.type}
        {...input}
      >
        {defaultOption && <option key={defaultOption}>{defaultOption}</option>}
        {options?.map((option, index) => {
          const value = map?.value ? option[map.value] : option;
          const name = map?.name ? option[map.name] : option;
          console.log(name);
          return (
            <option key={value} value={value}>
              {name}
            </option>
          );
        })}
      </select>
      {hasError && <small className='form-error text-danger'>{meta.error}</small>}
    </div>
  );
};

SelectInput.defaultProps = {
  readOnly: false,
  disabled: false,
  switch: false,
};

export default SelectInput;
