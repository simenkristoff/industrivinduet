import React from 'react';
import { useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { FormApi, SubmissionErrors } from 'final-form';
import { required } from '../../lib/Validation';
import { TextInput } from '../../components/forms/Adapters';

// Components
import { Switch } from 'antd';
import Button from 'react-bootstrap/Button';

// Types
import { RootState, Options } from '../../types';
import { getOptions } from '../../selectors';
import OptionsManager from '../../components/OptionManager';

interface IProps {
  onSubmit: (
    values: Options,
    form: FormApi<Options, Options>,
    callback?: (errors?: SubmissionErrors) => void,
  ) => SubmissionErrors | Promise<SubmissionErrors | undefined> | undefined | void;
}

const HomepageOptions: React.FC<IProps> = ({ onSubmit }: IProps) => {
  const { options } = useSelector(getOptions);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={options}
      render={({ handleSubmit, pristine, form, submitting, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <h5>
              Vis arrangementer&nbsp;
              <span>
                <Switch />
              </span>
            </h5>

            <Field name={`homepage.events`} label='Antall arrangementer' type='number' validate={required} component={TextInput} />

            <h5>
              Vis stillingsannonser&nbsp;
              <span>
                <Switch />
              </span>
            </h5>

            <Field name={`homepage.jobs`} label='Antall stillingsannonser' type='number' validate={required} component={TextInput} />

            <div className='form-group text-center pt-2'>
              <Button variant='primary' type='submit' disabled={submitting || pristine}>
                Lagre
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
};

export default HomepageOptions;
