import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupsStart } from '../../redux/Group/group.actions';
import { Field, Form } from 'react-final-form';
import { required } from '../../lib/Validation';
import { TextInput, SelectInput } from '../../components/forms/Adapters';
import { getRoles, getGroups } from '../../selectors';

// Types
import { DatabaseFormProps } from '../../components/DatabaseManager/interface';
import { RootState } from '../../types';

// Components
import Button from 'react-bootstrap/Button';

const mapState = (state: RootState) => ({
  role: state.rolesData.role,
  groups: state.groupsData.groups,
});

const RoleForm: React.FC<DatabaseFormProps> = (props: DatabaseFormProps) => {
  const dispatch = useDispatch();
  const { onSubmit, editMode } = props;
  const { role } = useSelector(getRoles);
  const { groups } = useSelector(getGroups);

  useEffect(() => {
    dispatch(fetchGroupsStart());
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={role}
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
            <Field name='name' label='Stillingsnavn' placeholder='Stillingsnavn' validate={required} component={TextInput} />

            <Field
              name='group._id'
              label='Gruppe'
              validate={required}
              component={SelectInput}
              defaultOption='Velg grupp'
              options={groups}
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

export default RoleForm;
