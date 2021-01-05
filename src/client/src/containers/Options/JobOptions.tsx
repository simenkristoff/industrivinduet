import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { updateOptionStart } from '../../redux/Option/option.actions';
import { required } from '../../lib/Validation';
import { ArrayInput } from '../../components/forms/Adapters';

// Components
import Button from 'react-bootstrap/Button';

// Types
import { RootState, Options } from '../../types';

const mapState = ({ optionsData }: RootState) => ({
  options: optionsData.options,
});

const JobOptions = () => {
  const dispatch = useDispatch();
  const { options } = useSelector(mapState);

  const handleSubmit = (form: Options) => {
    return new Promise<boolean | string>((resolve, reject) => {
      if (!form) {
        reject(false);
      } else {
        dispatch(updateOptionStart(form));
        resolve(true);
      }
    });
  };

  return (
    <div>
      <h1>Innstillinger for arrangementer</h1>
      <Form
        onSubmit={handleSubmit}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={options}
        render={({ handleSubmit, pristine, form, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <ArrayInput name='job.types' label='Type stillinger' mutators={form.mutators} validate={required} />

              <div className='form-group text-center pt-2'>
                <Button variant='primary' type='submit' disabled={submitting || pristine}>
                  Lagre
                </Button>
              </div>
            </form>
          );
        }}
      ></Form>
    </div>
  );
};

export default JobOptions;
