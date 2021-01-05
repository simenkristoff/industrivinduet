import React from 'react';
import { useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { required } from '../../lib/Validation';
import { TextInput } from '../../components/forms/Adapters';
import { getGroups } from '../../selectors';

// Types
import { DatabaseFormProps } from '../../components/DatabaseManager/interface';

// Components
import Button from 'react-bootstrap/Button';

const GroupForm: React.FC<DatabaseFormProps> = (props: DatabaseFormProps) => {
  const { onSubmit, editMode } = props;
  const { group } = useSelector(getGroups);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={group}
      render={({ handleSubmit, pristine, form, submitting, values }) => {
        return (
          <form
            onSubmit={(event) => {
              const promise = handleSubmit(event);
              promise &&
                promise.then(() => {
                  form.reset();
                });
              return promise;
            }}
          >
            <Field name='name' label='Gruppenavn' placeholder='Gruppenavn' validate={required} component={TextInput} />

            <div className='form-group text-center pt-2'>
              <Button variant='primary' type='submit' disabled={submitting || pristine}>
                {editMode ? 'Lagre' : 'Legg til'}
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
};

export default GroupForm;
