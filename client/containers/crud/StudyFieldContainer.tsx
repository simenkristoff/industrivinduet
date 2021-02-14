import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table';

import { IApplicationState, StudyFieldEntity, StudyFieldState } from '@/types';
import { StudyFieldForm } from '@/components/forms';
import {
  createStudyField,
  deleteStudyField,
  fetchStudyFields,
  setStudyField,
  updateStudyField,
} from '@/state/ducks/studyfield/actions';

import { CrudContainer } from './CrudContainer';

export const StudyFieldContainer: React.FC = () => {
  const dispatch = useDispatch();
  const studyfieldState: StudyFieldState = useSelector(({ studyfield }: IApplicationState) => ({
    byId: studyfield.byId,
    data: studyfield.data,
    loading: studyfield.loading,
    status: studyfield.status,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchStudyFields()), [dispatch]),
    create: useCallback((studyfield) => dispatch(createStudyField(studyfield)), [dispatch]),
    update: useCallback((studyfield) => dispatch(updateStudyField(studyfield)), [dispatch]),
    remove: useCallback((studyfield) => dispatch(deleteStudyField(studyfield)), [dispatch]),
    set: useCallback((studyfield) => dispatch(setStudyField(studyfield)), [dispatch]),
  };

  const columns: ColumnsType<StudyFieldEntity> = [
    {
      title: 'Navn',
      className: 'hide-sm',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
    },
    {
      title: 'Forkortelse',
      dataIndex: 'abbr',
      key: 'abbr',
      sorter: (a, b) => a.abbr.localeCompare(b.abbr, 'nb'),
    },
  ];

  const stateToProps = {
    state: studyfieldState,
    columns,
    name: {
      singular: 'Studieretning',
      plural: 'Studieretninger',
    },
    dataForm: StudyFieldForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
