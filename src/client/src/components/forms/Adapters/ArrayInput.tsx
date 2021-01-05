import React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FieldValidator } from 'final-form';
import { Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

interface IProps {
  name: string;
  label?: string;
  mutators: Record<string, (...args: any[]) => any>;
  validate?: FieldValidator<any> | undefined;
}

const ArrayInput: React.FC<IProps> = ({ name, mutators, validate, ...props }: IProps) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{props.label}</label>
      <FieldArray name={name}>
        {({ fields }) =>
          fields.map((field, index) => (
            <Field key={field} name={field} validate={validate}>
              {({ input, meta }) => {
                const hasError = meta.error && meta.touched;
                return (
                  <div className='input-group mt-2'>
                    <input placeholder={meta.error} className={`form-control ${hasError ? 'is-invalid' : ''}`} {...input} />
                    <div className='input-group-append'>
                      <div className='input-group-text'>
                        <FaTimes style={{ cursor: 'pointer' }} onClick={() => fields.remove(index)} />
                      </div>
                    </div>
                  </div>
                );
              }}
            </Field>
          ))
        }
      </FieldArray>

      <Button variant='primary' className='mt-2' onClick={() => mutators.push(name, undefined)}>
        Legg til ny
      </Button>
    </div>
  );
};

export default ArrayInput;
