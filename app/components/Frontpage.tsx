import React, { useEffect } from 'react';
import { Row, Col, Spin, Image, Button } from 'antd';
import { OptionState } from '@/state/ducks/option/types';
import { EventEntity } from '@/state/ducks/event/types';
import { JobEntity } from '@/state/ducks/job/types';
import { PartnerEntity } from '@/state/ducks/partner/types';
import smorekoppen from '@resources/smorekoppen_banner.jpg';
import iv_icon from '@resources/iv_icon.png';
import { MailOutlined } from '@ant-design/icons';

import { EventCard } from './EventCard';
import { JobItem } from './JobItem';
import { PartnerCard } from './PartnerCard';
import { Map } from './Map';

interface IProps {
  options: OptionState;
  events: EventEntity[];
  eventColSize: number;
  jobs: JobEntity[];
  partners: PartnerEntity[];
  fetchEvents: (limit: number) => void;
  fetchJobs: (limit: number) => void;
  fetchPartners: () => void;
}

export const Frontpage: React.FC<IProps> = ({
  options,
  events,
  eventColSize,
  jobs,
  partners,
  fetchEvents,
  fetchJobs,
  fetchPartners,
}: IProps) => {
  const { event, job } = options;
  if (!event.homepage || !job.homepage) {
    return <Spin />;
  }

  useEffect(() => {
    if (!options.loading) {
      if (event.homepage.displayEvents) {
        fetchEvents(event.homepage.numberOfEvents);
      }
      if (job.homepage.displayJobs) {
        fetchJobs(job.homepage.numberOfJobs);
      }
      fetchPartners();
    }
  }, [options.loading]);
  console.log(jobs);
  console.log(events);

  return (
    <div className='frontpage-wrapper'>
      {events.length > 0 && (
        <Row gutter={[16, 16]} justify='center'>
          {events.map((event) => (
            <EventCard key={event._id} data={event} column={{ sm: eventColSize }} />
          ))}
        </Row>
      )}

      <Row gutter={[16, 16]}>
        <Col md={jobs.length > 0 ? 8 : 24} sm={24} className='partners-wrapper'>
          <section className='partners'>
            <h3 className='section-title'>Samarbeidspartnere</h3>
            {partners &&
              partners.map((partner) => <PartnerCard data={partner} key={partner._id} />)}
          </section>
        </Col>
        {jobs.length > 0 && (
          <Col md={16} sm={24}>
            <section className='jobs'>
              <h3 className='section-title'>Stillingsannonser</h3>
              {jobs.map((job) => (
                <JobItem data={job} key={job._id} margin={false} />
              ))}
            </section>
          </Col>
        )}
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <section className='contact'>
            <div className='map-wrapper'>
              <Map />
            </div>
            <div className='contact-overlay text-center'>
              <div className='section-main'>
                {options.general.sitename && [
                  <img className='icon' src={iv_icon} alt={options.general.sitename} key='icon' />,
                  <h2 className='section-title pb-0' key='sitename'>
                    {options.general.sitename}
                  </h2>,
                ]}

                <Button size='large' ghost icon={<MailOutlined />} href='/kontakt'>
                  Konakt oss
                </Button>
              </div>
            </div>
          </section>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <section className='student-organization'>
            <a href='https://www.xn--smrekoppen-1cb.no/'>
              <img className='cover' src={smorekoppen} alt='A/F Smørekoppen' />
              <div className='overlay'>
                <h4 className='pb-1'>Gå til A/F Smørekoppens nettside</h4>
              </div>
            </a>
          </section>
        </Col>
      </Row>
    </div>
  );
};
