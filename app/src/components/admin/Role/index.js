import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {addRoleStart, updateRoleStart, deleteRoleStart, fetchRolesStart, fetchRoleStart, setRole} from './../../../redux/Role/role.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa';
import {Table, Space} from 'antd';

// Components 
import Modal from 'react-bootstrap/Modal';
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
    roles: rolesData.roles
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

    const handleSubmit = (form) => {
        return new Promise((resolve, reject) => {
            if(!form) {
                reject();
            } else {
                if(editMode) {
                    dispatch(
                        updateRoleStart(form)
                    );
                } else {
                    dispatch(
                        addRoleStart(form)
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
                setRole(event)
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
                    deleteRoleStart(id)
                );
            }
        });
    }

    const handleClose = () => {
        dispatch(
            setRole({})
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
            title: 'Gruppe',
            dataIndex: 'group',
            key: 'group',
            align: 'center',
            sorter: (a, b) => a.group.name.localeCompare(b.group.name, 'nb'),
            render: (record) => (record.name)
            
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
                <h2 className="db-manager-title">Stillinger</h2>
                <button type="button" className="btn btn-primary" onClick={() => handleEdit()}>
                    <FaPlus /> 
                    Stilling
                </button>
            </div>
            <div className="db-manager-content">
                <Table
                 columns={tableColumns} 
                 dataSource={roles}
                 rowKey={(record) => { return record._id}}
                 {...configTable} 
                />
            </div>
            <Modal {...configModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode? 'Rediger stilling' : 'Ny stilling'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RoleForm handleSubmit={handleSubmit} editMode={editMode} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Role;
