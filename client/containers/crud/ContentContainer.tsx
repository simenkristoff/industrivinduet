import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table';
import { IApplicationState, ContentEntity, ContentState } from '@/types';

import { ContentForm } from '@/components/forms';
import {
  createContent,
  deleteContent,
  fetchContents,
  setContent,
  updateContent,
} from '@/state/ducks/content/actions';

import { CrudContainer } from './CrudContainer';

export const ContentContainer: React.FC = () => {
  const dispatch = useDispatch();
  const contentState: ContentState = useSelector(({ content }: IApplicationState) => ({
    byId: content.byId,
    data: content.data,
    loading: content.loading,
    errors: content.errors,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchContents()), [dispatch]),
    create: useCallback((content) => dispatch(createContent(content)), [dispatch]),
    update: useCallback((content) => dispatch(updateContent(content)), [dispatch]),
    remove: useCallback((content) => dispatch(deleteContent(content)), [dispatch]),
    set: useCallback((content) => dispatch(setContent(content)), [dispatch]),
  };

  const columns: ColumnsType<ContentEntity> = [
    {
      title: 'Tittel',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title, 'nb'),
    },
    {
      title: 'Lenke',
      dataIndex: 'linkText',
      key: 'linkText',
      sorter: (a, b) => a.linkText.localeCompare(b.linkText, 'nb'),
    },
    {
      title: 'Prioritet',
      dataIndex: 'priority',
      key: 'priority',
      sorter: (a, b) => a.priority - b.priority,
    },
  ];

  const stateToProps = {
    state: contentState,
    columns,
    modal: {
      width: '90%',
    },
    name: {
      singular: 'Side',
      plural: 'Sider',
    },
    dataForm: ContentForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
