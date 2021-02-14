import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { ExpandableConfig } from 'antd/lib/table/interface';

import { IApplicationState, EventEntity, EventState } from '@/types';
import { EventForm } from '@/components/forms';
import { EventExpandable } from '@/components/EventExpandable';
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  setEvent,
  updateEvent,
} from '@/state/ducks/event/actions';
import { fetchStudyFields } from '@/state/ducks/studyfield/actions';
import { fetchMembers } from '@/state/ducks/member/actions';

import { CrudContainer } from './CrudContainer';

export const EventContainer: React.FC = () => {
  const dispatch = useDispatch();
  const eventState: EventState = useSelector(({ event }: IApplicationState) => ({
    byId: event.byId,
    data: event.data,
    loading: event.loading,
    status: event.status,
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
      className: 'hide-md',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      sorter: (a, b) => a.type.localeCompare(b.type, 'nb'),
    },
    {
      title: 'Dato',
      className: 'hide-sm',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      sorter: (a, b) => a.date.toString().localeCompare(b.date.toString()),
      render: (record) => moment(record).format('ll'),
    },
    {
      title: 'Ansvarlig',
      className: 'hide-lg',
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
    {
      title: 'Status',
      className: 'hide-md',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      sorter: (a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1),
      render: (record) => (record === true ? 'Aktiv' : 'Inaktiv'),
    },
  ];

  const expandable: ExpandableConfig<EventEntity> = {
    // eslint-disable-next-line react/display-name
    expandedRowRender: (record: EventEntity) => <EventExpandable {...record} />,
    rowExpandable: (record: { _id: string }) => record._id !== 'Not expandable',
  };

  const stateToProps = {
    requireAdmin: false,
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
