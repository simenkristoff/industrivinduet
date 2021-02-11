import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  IApplicationState,
  JobEntity,
  StudyFieldEntity,
  FilterTypeInterface,
  SearchFilterType,
  JobOptions,
} from '@/types';

import { fetchStudyFields } from '@/state/ducks/studyfield/actions';
import { fetchActiveJobs } from '@/state/ducks/job/actions';
import { JobItem } from '@/components/JobItem';
import { grades } from '@/constants';

import { ResultContainer } from './ResultContainer';

export const JobResultContainer = () => {
  const dispatch = useDispatch();
  const types: string[] = useSelector(
    ({ options }: IApplicationState) => (options.job as JobOptions).jobTypes,
  );
  const studyfields: StudyFieldEntity[] = useSelector(
    ({ studyfield }: IApplicationState) => studyfield.data,
  );
  const stateToProps = useSelector(({ job }: IApplicationState) => job.data);

  useEffect(() => {
    dispatch(fetchStudyFields());
    dispatch(fetchActiveJobs());
  }, []);

  const searchFilterTypes: SearchFilterType<JobEntity> = {
    fields: ['title', 'type', 'description', 'places'],
  };

  const filterTypes: FilterTypeInterface<JobEntity> = {
    type: {
      type: 'select',
      dependency: types,
      label: 'Type stilling',
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
    title: 'Stillingsannonser',
    data: stateToProps,
    dataItem: JobItem,
    filterTypes,
    searchFilterTypes,
  };

  return <ResultContainer {...resultProps} />;
};
