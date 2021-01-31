import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/state/interface';
import { fetchStudyFields } from '@/state/ducks/studyfield/actions';
import { fetchEvents } from '@/state/ducks/event/actions';
import { EventEntity } from '@/state/ducks/event/types';
import { EventCard } from '@/components/EventCard';
import { FilterTypeInterface, SearchFilterType } from '@/utils/filters';
import { grades } from '@/constants';
import { StudyFieldEntity } from '@/state/ducks/studyfield/types';

import { ResultContainer } from './ResultContainer';

export const EventResultContainer = () => {
  const dispatch = useDispatch();
  const types: string[] = useSelector(({ options }: IApplicationState) => options.event.eventTypes);
  const studyfields: StudyFieldEntity[] = useSelector(
    ({ studyfield }: IApplicationState) => studyfield.data,
  );
  const stateToProps = useSelector(({ event }: IApplicationState) => event.data);

  useEffect(() => {
    dispatch(fetchStudyFields());
    dispatch(fetchEvents());
  }, []);

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
      dependency: studyfields,
      label: 'Studieretninger',
    },
  };

  const resultProps = {
    title: 'Arrangementer',
    data: stateToProps,
    dataItem: EventCard,
    filterTypes,
    searchFilterTypes,
  };

  return <ResultContainer {...resultProps} />;
};
