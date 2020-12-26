import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addGroupStart, updateGroupStart, setGroup} from './../../../../redux/Group/group.actions';

// Components 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const mapState = ({groupsData}) => ({
    group: groupsData.group
});

const GroupForm = ({show, handleClose, editMode}) => {
    const dispatch = useDispatch();
    const {group} = useSelector(mapState);
    const [name, setName] = useState('');

    const resetForm = () => {
        setName('');
    }

    useEffect(() => {
        if(editMode) {
            setName(group.name);
        }

    }, [editMode]);

    const cleanUp = () => {
        dispatch(
            setGroup({})
        );
        resetForm();
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(editMode) {
            const {_id} = group;
            dispatch(
                updateGroupStart({
                    _id,
                    name
                })
            );
        } else {
            dispatch(
                addGroupStart({
                    name
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
                <Modal.Title>{editMode ? 'Rediger gruppe' : 'Ny gruppe'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Gruppenavn</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Gruppenavn"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
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

export default GroupForm;
