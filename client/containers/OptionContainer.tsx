import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, PageHeader } from 'antd';

import { IApplicationState, OptionEntity, OptionState } from '@/types';
import { fetchOptions, resetOptions, updateOptions, clear } from '@/state/ducks/option/actions';
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
    form.validateFields().then((values) => dispatch(updateOptions(values)));
  };

  const handleReset = () => {
    dispatch(resetOptions());
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
          <Button key='update' type='primary' size='large' onClick={handleSubmit}>
            Lagre innstillinger
          </Button>,
          <Button key='reset' danger size='large' onClick={handleReset}>
            Tilbakestill
          </Button>,
        ]}
      />
      <OptionForm {...optionProps} />
    </>
  );
};
