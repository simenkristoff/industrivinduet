import React from 'react';
import { Tabs } from 'antd';
import { FormInstance } from 'antd/lib/form';

import { OptionEntity, OptionState } from '@/types';
import { Spinner } from '@/components/Spinner';
import { ErrorResponse } from '@/components/ErrorResponse';

import GeneralOptionsForm from './GeneralOptionsForm';
import EventOptionsForm from './EventOptionsForm';
import JobOptionsForm from './JobOptionsForm';
import SocialOptionsForm from './SocialOptionsForm';

const { TabPane } = Tabs;

interface IProps {
  form: FormInstance<OptionEntity>;
  options: OptionState;
}

/**
 * Wrapper for Option forms
 */
const OptionForm: React.FC<IProps> = ({ form, options }: IProps) => {
  const render = () => {
    if (options.loading) {
      return <Spinner loading centered />;
    } else if (status) {
      return <ErrorResponse response={options.status} jumbotron />;
    }

    return (
      <Tabs defaultActiveKey='general' tabPosition='top'>
        <TabPane tab='Generelt' key='general'>
          <GeneralOptionsForm form={form} data={options} />
        </TabPane>
        <TabPane tab='Arrangementer' key='event'>
          <EventOptionsForm form={form} data={options} />
        </TabPane>
        <TabPane tab='Stillingsannonser' key='job'>
          <JobOptionsForm form={form} data={options} />
        </TabPane>
        <TabPane tab='Sosiale medier' key='socials'>
          <SocialOptionsForm form={form} data={options} />
        </TabPane>
      </Tabs>
    );
  };

  return <div className='options-manager'>{render()}</div>;
};

export default OptionForm;
