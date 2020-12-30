import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {addEventStart, updateEventStart, deleteEventStart, fetchEventsStart, fetchEventStart, setEvent} from './../../../redux/Event/event.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa';
import {Table, Space} from 'antd';
import moment from 'moment';

// Components
import Modal from 'react-bootstrap/Modal';
import EventForm from './EventForm';

const DeleteSwal = withReactContent(Swal.mixin({
    title: "Vil du fortsette?",
    text: "Endringen kan ikke gjenopprettes!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: 'Avbryt',
    focusCancel: true,
    confirmButtonText: 'Fortsett'
}));

const mapState = ({eventsData}) => ({
    events: eventsData.events
});

const Event = () => {
    const dispatch = useDispatch();
    const {events} = useSelector(mapState);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        dispatch(
            fetchEventsStart()
        );
    }, []);

    const handleSubmit = (form) => {
        return new Promise((resolve, reject) => {
            if(!form) {
                reject();
            } else {
                if(editMode) {
                    dispatch(
                        updateEventStart(form)
                    );
                } else {
                    dispatch(
                        addEventStart(form)
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
                setEvent(event)
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
                    deleteEventStart(id)
                );
            }
        });
    }

    const handleClose = () => {
        dispatch(
            setEvent({})
        );
        setEditMode(false);
        setShow(false);
    }

    const configModal = {
        size: "xl",
        show,
        onHide: handleClose
    }

    const renderExpandedColumn = (record) => (
        <div className="table-col-expanded">
            
            <div className="col-img">
                <img src={record.image} alt={record.title} />
            </div>

            <dl>
                <dt>Starter: </dt>
                <dd>{moment(record.starttime).format('HH:mm')}</dd>

                {record.endtime && [
                    <dt>Slutter: </dt>,
                    <dd>{moment(record.endtime).format('HH:mm')}</dd>
                ]}
            </dl>

            <dl>
                <dt>Sted: </dt>
                <dd>{record.place}</dd>

                {record.dining && [
                    <dt>Bespisning: </dt>,
                    <dd>{record.dining}</dd>
                ]}
            </dl>

            <dl>
                <dt>Lagt til: </dt>
                <dd>{moment(record.createdAt).format('lll')}</dd>

                <dt>Sist endret: </dt>
                <dd>{moment(record.updatedAt).format('lll')}</dd>
            </dl>
        </div>
    );

    const configTable = {
        tableLayout: 'auto',
        showSorterTooltip: false,
        pagination: {
            pageSize: 15,
            position: ['bottomCenter']
        },
        expandable: {
            expandedRowRender: record => renderExpandedColumn(record),
            rowExpandable: record => record._id !== 'Not expandable'
        }
    }

    const tableColumns = [
        {
            title: 'Tittel',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            sorter: (a, b) => a.title.localeCompare(b.title, 'nb'),
        },
        {
            title: 'Type',
            className: 'd-none d-lg-table-cell',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            sorter: (a, b) => a.type.localeCompare(b.type, 'nb'),
        },
        {
            title: 'Dato',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.date.localeCompare(b.date),
            render: (record) => (moment(record).format('ll'))
        },
        {
            title: 'Ansvarlig',
            className: 'd-none d-lg-table-cell',
            dataIndex: 'member',
            key: 'member',
            align: 'center',
            sorter: (a, b) => a.member.name.localeCompare(b.member.name, 'nb'),
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
                <h2 className="db-manager-title">Arrangementer</h2>
                <button type="button" className="btn btn-primary" onClick={() => handleEdit()}>
                    <FaPlus /> 
                    Arrangement
                </button>
            </div>
            <div className="db-manager-content">
                <Table
                 columns={tableColumns} 
                 dataSource={events}
                 rowKey={(record) => { return record._id}}
                 {...configTable} 
                />
            </div>
            <Modal {...configModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode? 'Rediger arrangement' : 'Nytt arrangement'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EventForm handleSubmit={handleSubmit} editMode={editMode} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Event;
