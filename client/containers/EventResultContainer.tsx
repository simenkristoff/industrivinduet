import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import {
  IApplicationState,
  EventState,
  StudyFieldState,
  EventEntity,
  FilterTypeInterface,
  SearchFilterType,
  EventOptions,
} from '@/types';
import { grades } from '@/constants';
import { EventCard } from '@/components/EventCard';
import { fetchStudyFields } from '@/state/ducks/studyfield/actions';
import { fetchActiveEvents } from '@/state/ducks/event/actions';

import { ResultContainer } from './ResultContainer';

export const EventResultContainer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const types: string[] = useSelector(
    ({ options }: IApplicationState) => (options.event as EventOptions).eventTypes,
  );
  const studyfieldState: StudyFieldState = useSelector(
    ({ studyfield }: IApplicationState) => studyfield,
  );
  const eventState: EventState = useSelector(({ event }: IApplicationState) => event);

  useEffect(() => {
    dispatch(fetchStudyFields());
    dispatch(fetchActiveEvents());
  }, []);

  useEffect(() => {
    setLoading(studyfieldState.loading || eventState.loading);
  }, [studyfieldState.loading, eventState.loading]);

  const searchFilterTypes: SearchFilterType<EventEntity> = {
    fields: ['title', 'type', 'description'],
  };

  const filterTypes: FilterTypeInterface<EventEntity> = {
    type: {
      type: 'select',
      dependency: types,
      label: 'Type arrangement',
    },
    grades: {
      type: 'checkbox',
      dependency: grades,
      label: 'Klassetrinn',
      postfix: '. trinn',
    },
    studyfields: {
      type: 'checkbox',
      field: 'abbr',
      dependency: studyfieldState.data,
      label: 'Studieretninger',
    },
  };

  const resultProps = {
    title: 'Arrangementer',
    data: eventState.data,
    dataItem: EventCard,
    loading,
    filterTypes,
    searchFilterTypes,
  };

  return <ResultContainer {...resultProps} />;
};
