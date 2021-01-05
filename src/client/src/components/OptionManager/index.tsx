import React from 'react';
import { useDispatch } from 'react-redux';
import { FormApi } from 'final-form';
import { Options } from '../../types';
interface OptionsManagerProps {
  title: string;
  form: React.ComponentType<any>;
  onUpdate: (form: Options) => void;
}

const OptionsManager: React.FC<OptionsManagerProps> = ({ title, form, onUpdate }: OptionsManagerProps) => {
  const dispatch = useDispatch();
  const FormComponent = form;

  const submit = (values: Options, form: FormApi<Options, Options>, callback?: (errors?: any) => void) => {
    return new Promise<boolean | string>((resolve, reject) => {
      console.log(values);
      if (!values) {
        reject(false);
      } else {
        console.log(values);
        dispatch(onUpdate(values));
        resolve(true);
      }
    });
  };

  return (
    <div>
      <h2>{title}</h2>
      <FormComponent onSubmit={submit} />
    </div>
  );
};

export default OptionsManager;
