import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/state/interface';
import { fetchStudyFields } from '@/state/ducks/studyfield/actions';
import { fetchJobs } from '@/state/ducks/job/actions';
import { JobEntity } from '@/state/ducks/job/types';
import { JobItem } from '@/components/JobItem';
import { FilterTypeInterface, SearchFilterType } from '@/utils/filters';
import { grades } from '@/constants';
import { StudyFieldEntity } from '@/state/ducks/studyfield/types';

import { ResultContainer } from './ResultContainer';

export const JobResultContainer = () => {
  const dispatch = useDispatch();
  const types: string[] = useSelector(({ options }: IApplicationState) => options.job.jobTypes);
  const studyfields: StudyFieldEntity[] = useSelector(
    ({ studyfield }: IApplicationState) => studyfield.data,
  );
  const stateToProps = useSelector(({ job }: IApplicationState) => job.data);

  useEffect(() => {
    dispatch(fetchStudyFields());
    dispatch(fetchJobs());
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
