import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMembersStart, deleteMemberStart, fetchMemberStart, setMember} from './../../../redux/Member/member.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa'

// Components
import MemberForm from './MemberForm';

const DeleteSwal = withReactContent(Swal.mixin({
    title: "Vil du fortsette?",
    text: "Endringen kan ikke gjenopprettes!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: 'Avbryt',
    focusCancel: true,
    confirmButtonText: 'Fortsett'
}));

const mapState = ({membersData}) => ({
    members: membersData.members,
});

const Member = () => {
    const dispatch = useDispatch();
    const {members} = useSelector(mapState);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(
            fetchMembersStart()
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

    const handleEdit = (member) => {
        setEditMode(true);

        dispatch(
            setMember(member)
        );
        
        setShow(true)
    };

    const handleDelete = (id) => {
        DeleteSwal.fire().then(({isConfirmed}) => {
            if (isConfirmed) {
                dispatch(
                    deleteMemberStart(id)
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
                <h2 className="db-manager-title">Medlemmer</h2>
                <button type="button" className="btn btn-primary" onClick={handleCreate}>
                    <FaPlus /> 
                    Medlem
                </button>
            </div>
            <div className="db-manager-content">
                <table id="members" className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Stilling</th>
                            <th>Gruppe</th>
                            <th>Handlinger</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => {
                            const {_id, name, role} = member;
                            if(!_id || !name) return null;

                            return (
                                <tr key={_id}>
                                    <td>{name}</td>
                                    <td>{role.name}</td>
                                    <td>{role.group.name}</td>
                                    <td>
                                        <FaEdit className="db-edit" onClick={() => handleEdit(member)} />
                                        <FaTimes className="db-remove" onClick={() => handleDelete(_id)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <MemberForm {...configForm} />
        </div>
    );
};

export default Member;