import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, PageHeader } from 'antd';
import { fetchOptions, resetOptions, updateOptions } from '@/state/ducks/option/actions';
import { OptionEntity, OptionState } from '@/state/ducks/option/types';
import { IApplicationState } from '@/state/interface';
import { OptionForm } from '@/components/forms';

export const OptionContainer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<OptionEntity>();
  const stateToProps: OptionState = useSelector(({ options }: IApplicationState) => ({
    general: options.general,
    event: options.event,
    job: options.job,
    socials: options.socials,
    loading: options.loading,
    errors: options.errors,
  }));

  const optionProps = {
    ...stateToProps,
    form,
  };

  const handleSubmit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.validateFields();
    //form.validateFields().then((values) => dispatch(updateOptions(values)));
  };

  const dispatchToProps = {
    fetchOptions: useCallback(() => dispatch(fetchOptions()), [dispatch]),
    updateOptions: useCallback((option: OptionEntity) => dispatch(updateOptions(option)), [
      dispatch,
    ]),
    resetOptions: useCallback(() => dispatch(resetOptions()), [dispatch]),
  };

  return (
    <>
      <PageHeader
        ghost={false}
        title='Innstillinger'
        extra={[
          <Button key='1' type='primary' size='large' onClick={handleSubmit}>
            Lagre innstillinger
          </Button>,
        ]}
      />
      <OptionForm {...optionProps} {...dispatchToProps} />
    </>
  );
};
