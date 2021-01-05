import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRolesStart } from '../../redux/Role/role.actions';
import { Field, Form } from 'react-final-form';
import { composeValidators, required, email } from '../../lib/Validation';
import { TextInput, SelectInput } from '../../components/forms/Adapters';
import { getMembers, getRoles } from '../../selectors';

// Types
import { DatabaseFormProps } from '../../components/DatabaseManager/interface';
import { RootState } from '../../types';

// Components
import Button from 'react-bootstrap/Button';

const MemberForm: React.FC<DatabaseFormProps> = (props: DatabaseFormProps) => {
  const dispatch = useDispatch();
  const { onSubmit, editMode } = props;
  const { member } = useSelector(getMembers);
  const { roles } = useSelector(getRoles);

  useEffect(() => {
    dispatch(fetchRolesStart());
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={member}
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
            <Field name='name' label='Navn' placeholder='Navn' validate={required} component={TextInput} />

            <Field name='email' label='E-mail' placeholder='E-mail' validate={composeValidators(required, email)} component={TextInput} />

            <Field
              name='role._id'
              label='Stilling'
              validate={required}
              component={SelectInput}
              defaultOption='Velg stilling'
              options={roles}
              map={{ value: '_id', name: 'name' }}
            />

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

export default MemberForm;
