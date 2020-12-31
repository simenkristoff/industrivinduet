import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Form} from 'react-final-form';
import {fetchMembersStart} from './../../../../redux/Member/member.actions';
import {composeValidators, required, email, mustBeNumber, date, time} from './../../../../lib/Validation';
import {DatePickerAdapter, TimePickerAdapter, CKEditorAdapter} from './../../../form/Adapters';
import moment from 'moment';

// Components
import {Collapse, Switch} from 'antd';
import Button from 'react-bootstrap/Button';
const {Panel} = Collapse;

const mapState = (state) => ({
    event: state.eventsData.event,
    members: state.membersData.members,
    options: state.optionsData.options
});


const EventForm = ({handleSubmit, editMode}) => {
    const dispatch = useDispatch();
    const {event, members, options} = useSelector(mapState);
    const [enableEndTime, setEnableEndTime] = useState(!event.endtime ? true : false);
    const [enableDining, setEnableDining] = useState(!event.dining ? true : false);

    useEffect(() => {
        dispatch(
            fetchMembersStart()
        );
    }, []);

    return (
        <Form onSubmit={handleSubmit}
            initialValues={event}
            render={({handleSubmit, pristine, form, submitting, values}) => {
                return (
                    <form onSubmit={(event) => {
                        const promise = handleSubmit(event);
                        promise && promise.then(() => {
                            form.reset();
                        });
                        return promise;
                    }}>
                        <div className="row">
                            <div className="col-md-7">

                                <Field
                                 id="event-editor" 
                                 name="description"
                                 validate={composeValidators(required)}
                                 label="Beskrivelse"
                                 component={CKEditorAdapter}
                                />

                            </div>

                            <div className="col-md-5">
                                <Collapse defaultActiveKey={['1']} onChange={(key) => console.log(key)}>
                                    <Panel header="Generelt" key="1">
                                        <Field name="title" validate={required}>
                                            {({input, meta}) => {
                                                const hasError = meta.error && meta.touched;
                                                return (
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="title">Tittel</label>
                                                        <input
                                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                                         placeholder="Tittel" 
                                                         type="text"
                                                         {...input} 
                                                        />
                                                        {hasError && (
                                                            <small className="form-error text-danger">{meta.error}</small>
                                                        )}
                                                    </div>
                                                );
                                            }}  
                                        </Field>

                                        <Field name="type" validate={required}>
                                            {({input, meta}) => {
                                                const hasError = meta.error && meta.touched;
                                                return (
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="type">Type arrangement</label>
                                                        <select
                                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                                         {...input} 
                                                        >
                                                            <option value="">Velg type</option>
                                                            {options.eventTypes.map((type, index) => (
                                                                <option key={type} value={type}>{type}</option>
                                                            ))}
                                                            
                                                        </select>
                                                        {hasError && (
                                                            <small className="form-error text-danger">{meta.error}</small>
                                                        )}
                                                    </div>
                                                );
                                            }}  
                                        </Field>

                                        <Field name="member._id" validate={required}>
                                            {({input, meta}) => {
                                                const hasError = meta.error && meta.touched;
                                                return (
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="member._id">Ansvarlig for arrangementet</label>
                                                        <select
                                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                                         {...input} 
                                                        >
                                                            <option value="">Velg medlem</option>
                                                            {members.map((member) => {
                                                                const {_id, name} = member;
                                                                return (
                                                                    <option key={_id} value={_id}>{name}</option>
                                                                );
                                                            })}
                                                        </select>
                                                        {hasError && (
                                                            <small className="form-error text-danger">{meta.error}</small>
                                                        )}
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </Panel>

                                    <Panel header="Profilering" key="2">
                                        <Field name="image" validate={required}>
                                            {({input, meta}) => {
                                                const hasError = meta.error && meta.touched;
                                                return (
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="image">Bilde</label>
                                                        <input
                                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                                         placeholder="Bilde" 
                                                         type="url"
                                                         {...input} 
                                                        />
                                                        {hasError && (
                                                            <small className="form-error text-danger">{meta.error}</small>
                                                        )}
                                                    </div>
                                                );
                                            }}  
                                        </Field>
                                    </Panel>

                                    <Panel header="Tid og dato" key="3">
                                        <Field 
                                         name="date"
                                         validate={required}
                                         label="Dato"
                                         component={DatePickerAdapter}
                                        />

                                        <Field 
                                         name="starttime"
                                         validate={required}
                                         label="Starttid"
                                         component={TimePickerAdapter}
                                        />
                                        
                                        <Field 
                                         name="endtime"
                                         label={
                                            <span>
                                                Sluttid&nbsp;
                                                <Switch
                                                 defaultChecked={!enableEndTime}
                                                 onChange={(e) => setEnableEndTime(!enableEndTime)}
                                                />
                                            </span>}
                                         component={TimePickerAdapter}
                                         disabled={enableEndTime}
                                        />
                                    </Panel>

                                    <Panel header="Lokalisering" key="4">
                                        <Field name="place" validate={required}>
                                            {({input, meta}) => {
                                                const hasError = meta.error && meta.touched;
                                                return (
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="place">Sted</label>
                                                        <input
                                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                                         placeholder="Sted" 
                                                         type="text"
                                                         {...input} 
                                                        />
                                                        {hasError && (
                                                            <small className="form-error text-danger">{meta.error}</small>
                                                        )}
                                                    </div>
                                                );
                                            }}  
                                        </Field>

                                        <Field name="dining">
                                            {({input, meta}) => {
                                                const hasError = meta.error && meta.touched;
                                                return (
                                                    <div className="form-group">
                                                        <label className="col-form-label" htmlFor="dining">
                                                            Bespisning&nbsp;   
                                                            <Switch
                                                             defaultChecked={!enableEndTime} 
                                                             onChange={(e) => setEnableDining(!enableDining)}
                                                            />
                                                        </label>
                                                        <input
                                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                                         placeholder="Bespisning"
                                                         disabled={enableDining} 
                                                         type="text"
                                                         {...input} 
                                                        />
                                                        {hasError && (
                                                            <small className="form-error text-danger">{meta.error}</small>
                                                        )}
                                                    </div>
                                                );
                                            }}  
                                        </Field>
                                        
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                        
                        <div className="form-group text-center pt-2">
                            <Button variant="primary" type="submit" disabled={submitting || pristine}>
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
