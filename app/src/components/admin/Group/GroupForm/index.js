import React from 'react';
import {useSelector} from 'react-redux';
import {Field, Form} from 'react-final-form';
import {required} from './../../../../validation';

// Components
import Button from 'react-bootstrap/Button';

const mapState = ({groupsData}) => ({
    group: groupsData.group
});

const GroupForm = ({handleSubmit, editMode}) => {
    const {group} = useSelector(mapState);

    return (
        <Form onSubmit={handleSubmit}
            initialValues={group}
            render={({handleSubmit, pristine, form, submitting, values}) => {
                return (
                    <form onSubmit={(event) => {
                        const promise = handleSubmit(event);
                        promise && promise.then(() => {
                            form.reset();
                        });
                        return promise;
                    }}>
                        <Field name="name" validate={required}>
                            {({input, meta}) => {
                                const hasError = meta.error && meta.touched;
                                return (
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="name">Gruppenavn</label>
                                        <input
                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                         placeholder="Gruppenavn" 
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

export default GroupForm;
