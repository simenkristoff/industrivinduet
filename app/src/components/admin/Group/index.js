import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {addGroupStart, updateGroupStart, deleteGroupStart, fetchGroupsStart, fetchGroupStart, setGroup} from './../../../redux/Group/group.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa'

// Components 
import Modal from 'react-bootstrap/Modal';
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
    groups: groupsData.groups
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

    const handleSubmit = (form) => {
        return new Promise((resolve, reject) => {
            if(!form) {
                reject();
            } else {
                if(editMode) {
                    dispatch(
                        updateGroupStart(form)
                    );
                } else {
                    dispatch(
                        addGroupStart(form)
                    );
                }
                handleClose();
                resolve();
            }
        })
    }

    const handleEdit = (event) => {
        if(event) {
            setEditMode(true);
            dispatch(
                setGroup(event)
            );
        } else {
            setEditMode(false);
        }
        setShow(true);
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

    const handleClose = () => {
        dispatch(
            setGroup({})
        );
        setEditMode(false);
        setShow(false);
    }

    const configModal = {
        show,
        onHide: handleClose
    }

    return (
        <div className="card db-manager">
            <div className="db-manager-header">
                <h2 className="db-manager-title">Grupper</h2>
                <button type="button" className="btn btn-primary" onClick={() => handleEdit()}>
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
                        {groups.map((group) => {
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
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Modal {...configModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode? 'Rediger gruppe' : 'Ny gruppe'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GroupForm handleSubmit={handleSubmit} editMode={editMode} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Group;
