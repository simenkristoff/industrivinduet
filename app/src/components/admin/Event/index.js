import React, {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useDispatch, useSelector} from 'react-redux';
import {addEventStart, updateEventStart, deleteEventStart, fetchEventsStart, fetchEventStart, setEvent} from './../../../redux/Event/event.actions';
import {FaEdit, FaTimes, FaPlus} from 'react-icons/fa'
import moment from 'moment'

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
                <table id="events" className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Dato</th>
                            <th>Sted</th>
                            <th>Ansvarlig</th>
                            <th>Handlinger</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => {
                            const {_id, title, type, date,
                                    starttime, endtime, place,
                                    dining, description, image,
                                    member, createdAt, updatedAt
                                } = event;
                            if(!_id || !title) return null;

                            return (
                                <tr key={_id}>
                                    <td>{title}</td>
                                    <td>{moment(date).format('ll')}</td>
                                    <td>{place}</td>
                                    <td>{member.name}</td>
                                    <td>
                                        <FaEdit className="db-edit" onClick={() => handleEdit(event)} />
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
