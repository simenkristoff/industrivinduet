import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { EventEntity, EventState } from '@/state/ducks/event/types';
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  setEvent,
  updateEvent,
} from '@/state/ducks/event/actions';
import { ColumnsType } from 'antd/lib/table';
import { EventForm } from '@/components/forms';
import moment from 'moment';
import { ExpandableConfig } from 'antd/lib/table/interface';
import EventExpandable from '@/components/EventExpandable';
import { fetchStudyFields } from '@/state/ducks/studyfield/actions';
import { fetchMembers } from '@/state/ducks/member/actions';

import CrudContainer from './CrudContainer';

const EventContainer: React.FC = () => {
  const dispatch = useDispatch();
  const eventState: EventState = useSelector(({ event }: IApplicationState) => ({
    byId: event.byId,
    data: event.data,
    loading: event.loading,
    errors: event.errors,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchEvents()), [dispatch]),
    create: useCallback((event) => dispatch(createEvent(event)), [dispatch]),
    update: useCallback((event) => dispatch(updateEvent(event)), [dispatch]),
    remove: useCallback((event) => dispatch(deleteEvent(event)), [dispatch]),
    set: useCallback((event) => dispatch(setEvent(event)), [dispatch]),
    dependencies: {
      getStudyFields: useCallback(() => dispatch(fetchStudyFields()), [dispatch]),
      getMembers: useCallback(() => dispatch(fetchMembers()), [dispatch]),
    },
  };

  const columns: ColumnsType<EventEntity> = [
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
      sorter: (a, b) => a.date.toString().localeCompare(b.date.toString()),
      render: (record) => moment(record).format('ll'),
    },
    {
      title: 'Ansvarlig',
      className: 'd-none d-lg-table-cell',
      dataIndex: 'member',
      key: 'member',
      align: 'center',
      sorter: (a, b) => {
        const c = a.member?.name.first || '';
        const d = b.member?.name.first || '';

        return c.localeCompare(d, 'nb');
      },
      render: (record?) => `${record.name.first} ${record.name.last}`,
    },
  ];

  const expandable: ExpandableConfig<EventEntity> = {
    // eslint-disable-next-line react/display-name
    expandedRowRender: (record: EventEntity) => <EventExpandable {...record} />,
    rowExpandable: (record: { _id: string }) => record._id !== 'Not expandable',
  };

  const stateToProps = {
    state: eventState,
    columns,
    expandable,
    modal: {
      width: '90%',
    },
    name: {
      singular: 'Arrangement',
      plural: 'Arrangementer',
    },
    dataForm: EventForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};

export default EventContainer;
