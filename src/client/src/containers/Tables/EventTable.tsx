import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEventStart, updateEventStart, deleteEventStart, fetchEventsStart, setEvent } from '../../redux/Event/event.actions';
import { ColumnsType } from 'antd/lib/table';
import { getEvents } from '../../selectors';
import moment from 'moment';

// Types
import { Event } from '../../types';

// Components
import EventForm from '../Forms/EventForm';
import DatabaseManager from '../../components/DatabaseManager';

const EventTable = () => {
  const dispatch = useDispatch();
  const { events } = useSelector(getEvents);

  useEffect(() => {
    dispatch(fetchEventsStart());
  }, []);

  const renderExpandedColumn = (record: Event) => (
    <div className='table-col-expanded'>
      <div className='col-img'>
        <img src={record.image} alt={record.title} />
      </div>

      <dl>
        <dt>Starter: </dt>
        <dd>{moment(record.starttime).format('HH:mm')}</dd>

        {record.endtime && [<dt key='label_endtime'>Slutter: </dt>, <dd key='value_endtime'>{moment(record.endtime).format('HH:mm')}</dd>]}
      </dl>

      <dl>
        <dt>Sted: </dt>
        <dd>{record.place}</dd>

        {record.dining && [<dt key='label_dining'>Bespisning: </dt>, <dd key='value_dining'>{record.dining}</dd>]}
      </dl>

      <dl>
        <dt>Lagt til: </dt>
        <dd>{moment(record.createdAt).format('lll')}</dd>

        <dt>Sist endret: </dt>
        <dd>{moment(record.updatedAt).format('lll')}</dd>
      </dl>
    </div>
  );

  const tableColumns: ColumnsType<Event> = [
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
      render: (record) => moment(record).format('ll'),
    },
    {
      title: 'Ansvarlig',
      className: 'd-none d-lg-table-cell',
      dataIndex: 'member',
      key: 'member',
      align: 'center',
      sorter: (a, b) => a.member.name.localeCompare(b.member.name, 'nb'),
      render: (record) => record.name,
    },
  ];

  const configDM = {
    name: {
      singular: 'Arrangement',
      plural: 'Arrangementer',
    },
    modalConfig: {
      size: 'xl' as const,
    },
    tableConfig: {
      expandable: {
        expandedRowRender: (record: Event) => renderExpandedColumn(record),
        rowExpandable: (record: { _id: string }) => record._id !== 'Not expandable',
      },
    },
    data: events,
    columns: tableColumns,
    component: EventForm,
    updateObject: updateEventStart,
    addObject: addEventStart,
    deleteObject: deleteEventStart,
    setObject: setEvent,
  };

  return <DatabaseManager<Event> {...configDM} />;
};

export default EventTable;
