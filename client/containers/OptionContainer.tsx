import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, PageHeader } from 'antd';

import { IApplicationState, OptionEntity, OptionState } from '@/types';
import { fetchOptions, resetOptions, updateOptions } from '@/state/ducks/option/actions';
import { fireActionVerify } from '@/utils';
import { OptionForm } from '@/components/forms';

export const OptionContainer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<OptionEntity>();
  const options: OptionState = useSelector(({ options }: IApplicationState) => options);

  useEffect(() => {
    dispatch(fetchOptions());
  }, []);

  const optionProps = {
    form,
    options,
  };

  const handleSubmit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.validateFields().then((values) => {
      dispatch(updateOptions(values));
    });
  };

  const handleReset = () => {
    fireActionVerify('OPTION').then((result) => {
      if (result.isConfirmed) {
        dispatch(resetOptions());
      }
    });
  };

  useEffect(() => {
    form.resetFields();
  }, [handleSubmit, handleReset]);

  return (
    <>
      <PageHeader
        ghost={false}
        title='Innstillinger'
        extra={[
          <Button
            key='update'
            className='hide-sm'
            type='primary'
            size='large'
            onClick={handleSubmit}
          >
            Lagre innstillinger
          </Button>,
          <Button key='reset' className='hide-sm' danger size='large' onClick={handleReset}>
            Tilbakestill
          </Button>,
        ]}
      />
      <OptionForm {...optionProps} />
    </>
  );
};
