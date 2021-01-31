import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { ContentEntity, ContentState } from '@/state/ducks/content/types';
import {
  createContent,
  deleteContent,
  fetchContents,
  setContent,
  updateContent,
} from '@/state/ducks/content/actions';
import { ColumnsType } from 'antd/lib/table';
import { ContentForm } from '@/components/forms';

import CrudContainer from './CrudContainer';

const ContentContainer: React.FC = () => {
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
    },
    {
      title: 'Lenke',
      dataIndex: 'linkText',
      key: 'linkText',
    },
    {
      title: 'Prioritet',
      dataIndex: 'priority',
      key: 'priority',
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

export default ContentContainer;
