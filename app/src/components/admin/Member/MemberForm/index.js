import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRolesStart} from './../../../../redux/Role/role.actions';
import {addMemberStart, updateMemberStart, setMember} from './../../../../redux/Member/member.actions';

// Components 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const mapState = (state) => ({
    roles: state.rolesData.roles,
    member: state.membersData.member
});

const MemberForm = ({show, handleClose, editMode}) => {
    const dispatch = useDispatch();
    const {roles, member} = useSelector(mapState);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const resetForm = () => {
        setName('');
        setEmail('');
        setRole('');
    }

    useEffect(() => {
        dispatch(
            fetchRolesStart()
        )
    }, []);

    useEffect(() => {
        if(editMode) {
            setName(member.name);
            setEmail(member.email);
            setRole(member.role._id);
        }
    }, [editMode]);

    const cleanUp = () => {
        dispatch(
            setMember({})
        );
        resetForm();
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(editMode) {
            const {_id} = member;
            dispatch(
                updateMemberStart({
                    _id,
                    name,
                    email,
                    role
                })
            );
        } else {
            dispatch(
                addMemberStart({
                    name,
                    email,
                    role
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
                <Modal.Title>{editMode ? 'Rediger medlem' : 'Nytt medlem'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Navn</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Navn navnesen"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">E-mail</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Stilling</label>
                        <select className="form-control"
                         value={role}
                         onChange={e => setRole(e.target.value)}
                         >
                            <option value="">Velg stilling</option>
                            {roles.map((roleData) => {
                                return (
                                    <option 
                                     key={roleData._id}
                                     value={roleData._id}
                                    >
                                    {roleData.name}
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

export default MemberForm;
