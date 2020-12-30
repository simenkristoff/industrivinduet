import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {addGroupStart, updateGroupStart, deleteGroupStart, fetchGroupsStart, fetchGroupStart, setGroup} from './../../../redux/Group/group.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa';
import {Table, Space} from 'antd';

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
                <h2 className="db-manager-title">Grupper</h2>
                <button type="button" className="btn btn-primary" onClick={() => handleEdit()}>
                    <FaPlus /> 
                    Gruppe
                </button>
            </div>
            <div className="db-manager-content">
                <Table
                 columns={tableColumns} 
                 dataSource={groups}
                 rowKey={(record) => { return record._id}}
                 {...configTable} 
                />
                 
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
