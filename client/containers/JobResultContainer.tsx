import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import {
  IApplicationState,
  JobState,
  StudyFieldState,
  JobEntity,
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
  const [loading, setLoading] = useState<boolean>(false);
  const types: string[] = useSelector(
    ({ options }: IApplicationState) => (options.job as JobOptions).jobTypes,
  );
  const studyfieldState: StudyFieldState = useSelector(
    ({ studyfield }: IApplicationState) => studyfield,
  );
  const jobState: JobState = useSelector(({ job }: IApplicationState) => job);

  useEffect(() => {
    dispatch(fetchStudyFields());
    dispatch(fetchActiveJobs());
  }, []);

  useEffect(() => {
    setLoading(studyfieldState.loading || jobState.loading);
  }, [studyfieldState.loading, jobState.loading]);

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
      dependency: studyfieldState.data,
      label: 'Studieretninger',
    },
  };

  const resultProps = {
    title: 'Stillingsannonser',
    data: jobState.data,
    dataItem: JobItem,
    loading,
    filterTypes,
    searchFilterTypes,
  };

  return <ResultContainer {...resultProps} />;
};
