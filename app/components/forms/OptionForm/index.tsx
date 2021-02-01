import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { OptionEntity, OptionPropsAll } from '@/state/ducks/option/types';
import { FormInstance } from 'antd/lib/form';

import GeneralOptionsForm from './GeneralOptionsForm';
import EventOptionsForm from './EventOptionsForm';
import JobOptionsForm from './JobOptionsForm';
import SocialOptionsForm from './SocialOptionsForm';

const { TabPane } = Tabs;

interface IProps extends OptionPropsAll {
  form: FormInstance<OptionEntity>;
}

const OptionForm: React.FC<IProps> = ({
  general,
  event,
  job,
  socials,
  form,
  fetchOptions,
  loading,
  errors,
}: IProps) => {
  useEffect(() => {
    fetchOptions();
  }, []);

  const options = { general, event, job, socials };

  return (
    <>
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
    </>
  );
};

export default OptionForm;
