import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Form} from 'react-final-form';
import {fetchRolesStart} from './../../../../redux/Role/role.actions';
import {composeValidators, required, email} from './../../../../lib/Validation';

// Components
import Button from 'react-bootstrap/Button';

const mapState = (state) => ({
    member: state.membersData.member,
    roles: state.rolesData.roles
});

const MemberForm = ({handleSubmit, editMode}) => {
    const dispatch = useDispatch();
    const {member, roles} = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchRolesStart()
        );
    }, []);

    return (
        <Form onSubmit={handleSubmit}
            initialValues={member}
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
                                        <label className="col-form-label" htmlFor="name">Navn</label>
                                        <input
                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                         placeholder="Navn" 
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

                        <Field name="email" validate={composeValidators(required, email)}>
                            {({input, meta}) => {
                                const hasError = meta.error && meta.touched;
                                return (
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="email">E-mail</label>
                                        <input
                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                         placeholder="E-mail" 
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

                        <Field name="role._id" validate={required}>
                            {({input, meta}) => {
                                const hasError = meta.error && meta.touched;
                                return (
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="role._id">Stilling</label>
                                        <select
                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                         {...input} 
                                        >
                                            <option value="">Velg stilling</option>
                                            {roles.map((role) => {
                                                const {_id, name} = role;
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

export default MemberForm;
