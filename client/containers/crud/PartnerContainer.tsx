import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '@/types';
import { Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { PartnerForm } from '@/components/forms';
import { PartnerEntity, PartnerState } from '@/state/ducks/partner/types';
import {
  createPartner,
  deletePartner,
  fetchPartners,
  setPartner,
  updatePartner,
} from '@/state/ducks/partner/actions';

import { CrudContainer } from './CrudContainer';

export const PartnerContainer: React.FC = () => {
  const dispatch = useDispatch();
  const partnerState: PartnerState = useSelector(({ partner }: IApplicationState) => ({
    byId: partner.byId,
    data: partner.data,
    loading: partner.loading,
    errors: partner.errors,
  }));

  const dispatchToProps = {
    fetch: useCallback(() => dispatch(fetchPartners()), [dispatch]),
    create: useCallback((partner) => dispatch(createPartner(partner)), [dispatch]),
    update: useCallback((partner) => dispatch(updatePartner(partner)), [dispatch]),
    remove: useCallback((partner) => dispatch(deletePartner(partner)), [dispatch]),
    set: useCallback((partner) => dispatch(setPartner(partner)), [dispatch]),
  };

  const columns: ColumnsType<PartnerEntity> = [
    {
      title: 'Bedrift',
      dataIndex: 'image',
      key: 'image',
      sorter: (a, b) => a.name.localeCompare(b.name, 'nb'),
      // eslint-disable-next-line react/display-name
      render: (record) => <Image src={record} width={100} />,
    },
    {
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const stateToProps = {
    state: partnerState,
    columns,
    name: {
      singular: 'Samarbeidspartner',
      plural: 'Samarbeidspartnere',
    },
    dataForm: PartnerForm,
  };

  return <CrudContainer {...stateToProps} {...dispatchToProps} />;
};
