import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { fetchOptionsStart, updateOptionStart } from '../../redux/Option/option.actions';
import { required } from '../../lib/Validation';
import { TextInput } from '../../components/forms/Adapters';

// Components
import Button from 'react-bootstrap/Button';

// Types
import { RootState, Options } from '../../types';

const mapState = ({ optionsData }: RootState) => ({
  options: optionsData.options,
});

const SocialOptions = () => {
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
      <h1>Innstillinger for sosiale medier</h1>
      <Form
        onSubmit={handleSubmit}
        initialValues={options}
        render={({ handleSubmit, pristine, form, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              {Object.keys(options.socials).map((social, key) => (
                <div key={social} className='social'>
                  <h5 style={{ textTransform: 'capitalize' }}>{social}</h5>
                  <Field name={`socials.${social}.url`} label='Lenke' type='url' validate={required} component={TextInput} />
                </div>
              ))}

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

export default SocialOptions;
