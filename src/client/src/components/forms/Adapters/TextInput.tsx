import React, { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Switch } from 'antd';

interface IProps extends FieldRenderProps<any, HTMLElement> {
  className?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  switch?: boolean;
}

const TextInput: React.FC<IProps> = ({ input, meta, ...props }: IProps) => {
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

      <input
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        disabled={props.switch ? !inputDisabled : props.disabled}
        placeholder={props.placeholder}
        type={props.type}
        readOnly={!!props.readOnly}
        {...input}
      />
      {hasError && <small className='form-error text-danger'>{meta.error}</small>}
    </div>
  );
};

TextInput.defaultProps = {
  type: 'text',
  readOnly: false,
  disabled: false,
  switch: false,
};

export default TextInput;
