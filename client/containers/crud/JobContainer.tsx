import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { IApplicationState, JobEntity, JobState } from '@/types';

import { JobForm } from '@/components/forms';
import { createJob, deleteJob, fetchJobs, setJob, updateJob } from '@/state/ducks/job/actions';
import { fetchStudyFields } from '@/state/ducks/studyfield/actions';
import { fetchMembers } from '@/state/ducks/member/actions';

import { CrudContainer } from './CrudContainer';

export const JobContainer: React.FC = () => {
  const dispatch = useDispatch();
  const jobState: JobState = useSelector(({ job }: IApplicationState) => ({
    byId: job.byId,
    data: job.data,
    loading: job.loading,
    errors: job.errors,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchJobs()), [dispatch]),
    create: useCallback((job) => dispatch(createJob(job)), [dispatch]),
    update: useCallback((job) => dispatch(updateJob(job)), [dispatch]),
    remove: useCallback((job) => dispatch(deleteJob(job)), [dispatch]),
    set: useCallback((job) => dispatch(setJob(job)), [dispatch]),
    dependencies: {
      getStudyFields: useCallback(() => dispatch(fetchStudyFields()), [dispatch]),
      getMembers: useCallback(() => dispatch(fetchMembers()), [dispatch]),
    },
  };

  const columns: ColumnsType<JobEntity> = [
    {
      dataIndex: 'image',
      key: 'image',
      // eslint-disable-next-line react/display-name
      render: (record) => <Image src={record} width={100} />,
    },
    {
      title: 'Bedrift',
      dataIndex: 'company',
      key: 'company',
      align: 'center',
      sorter: (a, b) => a.company.localeCompare(b.company, 'nb'),
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
      title: 'Frist',
      dataIndex: 'deadline',
      key: 'deadline',
      align: 'center',
      sorter: (a, b) => a.deadline.toString().localeCompare(b.deadline.toString()),
      render: (record) => moment(record).format('ll'),
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

  const stateToProps = {
    requireAdmin: false,
    state: jobState,
    columns,
    modal: {
      width: '90%',
    },
    name: {
      singular: 'Stillingsannonse',
      plural: 'Stillingsannonser',
    },
    dataForm: JobForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
