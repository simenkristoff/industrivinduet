import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembersStart } from '../../redux/Member/member.actions';
import { Field, Form } from 'react-final-form';
import { composeValidators, required } from '../../lib/Validation';
import { SelectInput, DatePicker, TimePicker, EditorField, TextInput } from '../../components/forms/Adapters';
import { getEvents, getMembers, getOptions } from '../../selectors';

// Types
import { DatabaseFormProps } from '../../components/DatabaseManager/interface';

// Components
import { Collapse, Switch } from 'antd';
import Button from 'react-bootstrap/Button';
const { Panel } = Collapse;

const EventForm: React.FC<DatabaseFormProps> = (props: DatabaseFormProps) => {
  const dispatch = useDispatch();
  const { onSubmit, editMode } = props;

  const { event } = useSelector(getEvents);
  const { members } = useSelector(getMembers);
  const { options } = useSelector(getOptions);

  const [enableEndTime, setEnableEndTime] = useState(!event.endtime ? true : false);
  const [enableDining, setEnableDining] = useState(!event.dining ? true : false);

  useEffect(() => {
    dispatch(fetchMembersStart());
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={event}
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
            <div className='row'>
              <div className='col-md-7'>
                <Field
                  id='event-editor'
                  name='description'
                  validate={composeValidators(required)}
                  label='Beskrivelse'
                  height='36rem'
                  component={EditorField}
                />
              </div>

              <div className='col-md-5'>
                <Collapse defaultActiveKey={['1']}>
                  <Panel header='Generelt' key='1'>
                    <Field name='title' label='Tittel' validate={required} component={TextInput} />

                    <Field
                      name='type'
                      label='Type arrangement'
                      validate={required}
                      component={SelectInput}
                      options={options.event.types}
                      defaultOption={'Velg stilling'}
                    />

                    <Field
                      name='member._id'
                      label='Ansvarlig for arrangementet'
                      validate={required}
                      component={SelectInput}
                      options={members}
                      map={{ value: '_id', name: 'name' }}
                      defaultOption='Velg medlem'
                    />
                  </Panel>

                  <Panel header='Profilering' key='2'>
                    <Field name='image' label='Bilde' validate={required} type='url' component={TextInput} />
                  </Panel>

                  <Panel header='Tid og dato' key='3'>
                    <Field name='date' validate={required} label='Dato' component={DatePicker} />

                    <Field name='starttime' validate={required} label='Starttid' component={TimePicker} />

                    <Field name='endtime' label='Sluttid' component={TimePicker} placeholder='Velg sluttid' switch={true} />
                  </Panel>

                  <Panel header='Lokalisering' key='4'>
                    <Field name='place' label='Sted' validate={required} component={TextInput} />

                    <Field name='dining' label='Bespisning' component={TextInput} switch={true} />
                  </Panel>
                </Collapse>
              </div>
            </div>

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

export default EventForm;
