import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGroupsStart} from './../../../../redux/Group/group.actions';
import {addRoleStart, updateRoleStart, setRole} from './../../../../redux/Role/role.actions';

// Components 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const mapState = state => ({
    groups: state.groupsData.groups,
    role: state.rolesData.role
});

const RoleForm = ({show, handleClose, editMode}) => {
    const dispatch = useDispatch();
    const {groups, role} = useSelector(mapState);
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');

    const resetForm = () => {
        setName('');
        setGroup('');
    }

    useEffect(() => {
        dispatch(
            fetchGroupsStart()
        );
    }, []);

    useEffect(() => {
        if(editMode) {
            setName(role.name);
            setGroup(role.group._id);
        }
    }, [editMode]);

    const cleanUp = () => {
        dispatch(
            setRole({})
        );
        resetForm();
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(editMode) {
            const {_id} = role;
            dispatch(
                updateRoleStart({
                    _id,
                    name,
                    group
                })
            );
        } else {
            dispatch(
                addRoleStart({
                    name,
                    group
                })
            );
        }
        handleClose();
    };

    const configModal = {
        show,
        onHide: handleClose,
        onExit: cleanUp
    };

    return (

        <Modal {...configModal}>
            <Modal.Header closeButton>
                <Modal.Title>{editMode ? 'Rediger stilling' : 'Ny stilling'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Stillingsnavn</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Gruppenavn"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="group">Gruppe</label>
                        <select className="form-control"
                         value={group}
                         onChange={e => setGroup(e.target.value)}
                         >
                            {groups.map((groupData) => {
                                return (
                                    <option 
                                     key={groupData._id}
                                     value={groupData._id}
                                    >
                                    {groupData.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="form-group text-center pt-2">
                        <Button className="mr-2" variant="secondary" onClick={handleClose}>Avbryt</Button>
                        <Button variant="primary" type="submit">{editMode ? 'Lagre' : 'Legg til'}</Button>
                    </div>
                    
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default RoleForm;
