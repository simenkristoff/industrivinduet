import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {addMemberStart, updateMemberStart, deleteMemberStart, fetchMembersStart, fetchMemberStart, setMember} from './../../../redux/Member/member.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa';
import {Table, Space} from 'antd';

// Components 
import Modal from 'react-bootstrap/Modal';
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
    members: membersData.members
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

    const handleSubmit = (form) => {
        return new Promise((resolve, reject) => {
            if(!form) {
                reject();
            } else {
                if(editMode) {
                    dispatch(
                        updateMemberStart(form)
                    );
                } else {
                    dispatch(
                        addMemberStart(form)
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
                setMember(event)
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
                    deleteMemberStart(id)
                );
            }
        });
    }

    const handleClose = () => {
        dispatch(
            setMember({})
        );
        setEditMode(false);
        setShow(false);
    }

    const configModal = {
        show,
        onHide: handleClose
    }

    const configTable = {
        tableLayout: 'auto',
        showSorterTooltip: false,
        pagination: {
            pageSize: 15,
            position: ['bottomCenter']
        }
    }

    const tableColumns = [
        {
            title: 'Navn',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
        },
        {
            title: 'Stilling',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            sorter: (a, b) => a.role.name.localeCompare(b.role.name, 'nb'),
            render: (record) => (record.name)
            
        },
        {
            title: 'Gruppe',
            dataIndex: 'role',
            key: 'group',
            align: 'center',
            sorter: (a, b) => a.role.group.name.localeCompare(b.role.group.name, 'nb'),
            render: (record) => (record.group.name)
        },
        {
            title: 'Handlinger',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Space size="small">
                    <FaEdit className="db-edit" onClick={() => handleEdit(record)} />
                    <FaTimes className="db-remove" onClick={() => handleDelete(record._id)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="card db-manager">
            <div className="db-manager-header">
                <h2 className="db-manager-title">Medlemmer</h2>
                <button type="button" className="btn btn-primary" onClick={() => handleEdit()}>
                    <FaPlus /> 
                    Medlem
                </button>
            </div>
            <div className="db-manager-content">
                <Table
                 columns={tableColumns} 
                 dataSource={members}
                 rowKey={(record) => { return record._id}}
                 {...configTable} 
                />
            </div>
            <Modal {...configModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode? 'Rediger medlem' : 'Nytt medlem'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MemberForm handleSubmit={handleSubmit} editMode={editMode} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Member;
