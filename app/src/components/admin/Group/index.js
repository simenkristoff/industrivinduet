import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGroupsStart, deleteGroupStart, fetchGroupStart, setGroup} from './../../../redux/Group/group.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa'

// Components
import GroupForm from './GroupForm';

const DeleteSwal = withReactContent(Swal.mixin({
    title: "Vil du fortsette?",
    text: "Endringen kan ikke gjenopprettes!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: 'Avbryt',
    focusCancel: true,
    confirmButtonText: 'Fortsett'
}));

const mapState = ({groupsData}) => ({
    groups: groupsData.groups,
});

const Group = () => {
    const dispatch = useDispatch();
    const {groups} = useSelector(mapState);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(
            fetchGroupsStart()
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

    const handleEdit = (group) => {
        setEditMode(true);

        dispatch(
            setGroup(group)
        );
        
        setShow(true)
    };

    const handleDelete = (id) => {
        DeleteSwal.fire().then(({isConfirmed}) => {
            if (isConfirmed) {
                dispatch(
                    deleteGroupStart(id)
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
                <h2 className="db-manager-title">Grupper</h2>
                <button type="button" className="btn btn-primary" onClick={handleCreate}>
                    <FaPlus /> 
                    Gruppe
                </button>
            </div>
            <div className="db-manager-content">
                <table id="groups" className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Handlinger</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group, index) => {
                            const {_id, name} = group;
                            if(!_id || !name) return null;

                            return (
                                <tr key={_id}>
                                    <td>{name}</td>
                                    <td>
                                        <FaEdit className="db-edit" onClick={() => handleEdit(group)} />
                                        <FaTimes className="db-remove" onClick={() => handleDelete(_id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <GroupForm {...configForm} />
        </div>
    );
};

export default Group;