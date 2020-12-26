import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRolesStart, deleteRoleStart, fetchRoleStart, setRole} from './../../../redux/Role/role.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa'

// Components
import RoleForm from './RoleForm';

const DeleteSwal = withReactContent(Swal.mixin({
    title: "Vil du fortsette?",
    text: "Endringen kan ikke gjenopprettes!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: 'Avbryt',
    focusCancel: true,
    confirmButtonText: 'Fortsett'
}));

const mapState = ({rolesData}) => ({
    roles: rolesData.roles,
});

const Role = () => {
    const dispatch = useDispatch();
    const {roles} = useSelector(mapState);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(
            fetchRolesStart()
        );
    }, []);
 
    const handleClose = () => {
        setEditMode(false);
        setShow(false);
    }

    const handleCreate = () => {
        setEditMode(false);
        setShow(true)
    }

    const handleEdit = (role) => {
        setEditMode(true);

        dispatch(
            setRole(role)
        );
        
        setShow(true)
    };

    const handleDelete = (id) => {
        DeleteSwal.fire().then(({isConfirmed}) => {
            if (isConfirmed) {
                dispatch(
                    deleteRoleStart(id)
                );
            }
        });
    }

    const configForm = {
        show,
        handleClose,
        editMode
    };

    return (
        <div className="card db-manager">
            <div className="db-manager-header">
                <h2 className="db-manager-title">Stillinger</h2>
                <button type="button" className="btn btn-primary" onClick={handleCreate}>
                    <FaPlus /> 
                    Stilling
                </button>
            </div>
            <div className="db-manager-content">
                <table id="roles" className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Gruppe</th>
                            <th>Handlinger</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role, index) => {
                            const {_id, name, group} = role;
                            if(!_id || !name) return null;

                            return (
                                <tr key={_id}>
                                    <td>{name}</td>
                                    <td>{group.name}</td>
                                    <td>
                                        <FaEdit className="db-edit" onClick={() => handleEdit(role)} />
                                        <FaTimes className="db-remove" onClick={() => handleDelete(_id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <RoleForm {...configForm} />
        </div>
    );
};

export default Role;