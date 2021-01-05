import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { fetchOptionsStart, updateOptionStart } from '../../redux/Option/option.actions';
import { composeValidators, required, email, mustBeNumber, minLength, phone } from '../../lib/Validation';
import { TextInput, EditorField } from '../../components/forms/Adapters';

// Components
import Button from 'react-bootstrap/Button';

// Types
import { RootState, Options } from '../../types';

const mapState = ({ optionsData }: RootState) => ({
  options: optionsData.options,
});

const GeneralOptions = () => {
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
      <h1>Generelle innstillinger</h1>
      <Form
        onSubmit={handleSubmit}
        initialValues={options}
        render={({ handleSubmit, pristine, form, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Field name='details.name' label='Nettsidens navn' validate={required} component={TextInput} />

              <Field
                name='details.email'
                label='E-post for henvendelser'
                validate={composeValidators(required, email)}
                component={TextInput}
              />

              <Field name='details.phone' label='Tlf for henvendelser' validate={phone} component={TextInput} />

              <Field name='details.address' label='Adresse' validate={required} component={TextInput} />

              <Field
                name='details.organization'
                label='Org.nr'
                validate={composeValidators(required, mustBeNumber)}
                component={TextInput}
              />

              <Field
                name='details.about'
                label={`Beskrivelse av ${options.details.name}`}
                validate={composeValidators(required, minLength(150))}
                component={EditorField}
                height='20rem'
              />

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

export default GeneralOptions;
