import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Form} from 'react-final-form';
import {fetchGroupsStart} from './../../../../redux/Group/group.actions';
import {required} from './../../../../lib/Validation';

// Components
import Button from 'react-bootstrap/Button';

const mapState = (state) => ({
    role: state.rolesData.role,
    groups: state.groupsData.groups
});

const RoleForm = ({handleSubmit, editMode}) => {
    const dispatch = useDispatch();
    const {role, groups} = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchGroupsStart()
        );
    }, []);

    return (
        <Form onSubmit={handleSubmit}
            initialValues={role}
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
                                        <label className="col-form-label" htmlFor="name">Stillingsnavn</label>
                                        <input
                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                         placeholder="Stillingsnavn" 
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

                        <Field name="group._id" validate={required}>
                            {({input, meta}) => {
                                const hasError = meta.error && meta.touched;
                                return (
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="group._id">Gruppe</label>
                                        <select
                                         className={`form-control ${hasError ? 'is-invalid' : ''}`}
                                         {...input} 
                                        >
                                            <option value="">Velg gruppe</option>
                                            {groups.map((group) => {
                                                const {_id, name} = group;
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

export default RoleForm;
