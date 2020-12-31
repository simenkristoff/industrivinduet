import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Form} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import {fetchOptionsStart, updateOptionStart, resetAllOptionsStart} from './../../../redux/Option/option.actions';
import {composeValidators, required, email} from './../../../lib/Validation';
import {InputAdapter, InputIconAdapter} from './../../form/Adapters';
import {FaTimes} from 'react-icons/fa';

// Components
import Button from 'react-bootstrap/Button';

const mapState = ({optionsData}) => ({
    options: optionsData.options
});

const Options = (props) => {
    const dispatch = useDispatch();
    const {options} = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchOptionsStart()
        );
    }, []);

    const handleSubmit = (form) => {
        return new Promise((resolve, reject) => {
            console.log(form);
            if(!form) {
                reject();
            } else {
                dispatch(
                    updateOptionStart(form)
                );
                resolve();
            }
        })
    };

    const handleResetAll = () => {
        dispatch(
            resetAllOptionsStart()
        );
    }

    return (
        <div>
            <h1>Innstillinger</h1>
            <Form onSubmit={handleSubmit}
                mutators={{
                    ...arrayMutators
                }}
                initialValues={options}
                render={({handleSubmit, pristine, form, submitting, values}) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Field name="siteName" validate={required}>
                                {({input, meta}) => {
                                    const hasError = meta.error && meta.touched;
                                    return (
                                        <div className="form-group">
                                            <label className="col-form-label" htmlFor="siteName">Navn</label>
                                            <input
                                            className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                            placeholder="Nettsidens navn" 
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

                            <div className="form-group">
                                <h4>Arrangement typer</h4>
                                <FieldArray name="eventTypes">
                                    {({fields}) => fields.map((name, index) => (
                                            <Field
                                            key={name}
                                            name={name}
                                            validate={required}
                                            icon={
                                                <FaTimes
                                                style={{ cursor: 'pointer' }} 
                                                onClick={() => fields.remove(index)}
                                                />}
                                            component={InputIconAdapter}
                                            />
                                    ))}
                                </FieldArray>
                            
                                <Button variant="primary" 
                                 onClick={() => form.mutators.push('eventTypes', undefined)}>Legg til
                                </Button>
                            </div>

                            <div className="form-group text-center pt-2">
                                <Button variant="primary" type="submit" disabled={submitting || pristine}>
                                    Lagre
                                </Button>
                                &nbsp;
                                <Button variant="primary" type="button" onClick={handleResetAll}>
                                    Tilbakestill
                                </Button>
                            </div>
                        </form>
                    );
                }}>
            </Form>
        </div>
    );
};

export default Options;
