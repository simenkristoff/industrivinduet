import React, { useEffect } from 'react';
import { Layout, Row, Col, Spin, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import {
  EventOptions,
  GeneralOptions,
  JobOptions,
  OptionState,
  EventEntity,
  JobEntity,
  PartnerEntity,
} from '@/types';
import { Container } from '@/components/Container';
import { EventCard } from '@/components/EventCard';
import { JobItem } from '@/components/JobItem';
import { PartnerCard } from '@/components/PartnerCard';
import { HeaderContainer } from '@/containers/HeaderContainer';
import { GoogleMapsContainer } from '@/containers/GoogleMapsContainer';
import { FooterContainer } from '@/containers/FooterContainer';
import iv_icon from '@resources/iv_icon.png';
import smorekoppen from '@resources/smorekoppen_banner.jpg';
import frontpage_banner from '@resources/unused2.png';

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
  const general = options.general as GeneralOptions;
  const event = options.event as EventOptions;
  const job = options.job as JobOptions;
  if (!event.homepage || !job.homepage || !general) {
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

  return (
    <>
      <HeaderContainer />
      <Container
        className='frontpage-wrapper'
        size='full'
        style={{ backgroundImage: `url(${frontpage_banner})` }}
      >
        <Layout>
          <Layout.Content className='main-content'>
            <section className='events'>
              <Container className='events-wrapper'>
                <Row gutter={[16, 16]} justify='center'>
                  {events.length > 0 &&
                    events.map((event) => (
                      <EventCard
                        key={event._id}
                        data={event}
                        column={{ sm: eventColSize }}
                        scaleOnHover
                        className='bg-light'
                      />
                    ))}
                </Row>
              </Container>
            </section>

            <Container className='content-wrapper'>
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
                        <JobItem className='' data={job} key={job._id} margin={false} />
                      ))}
                    </section>
                  </Col>
                )}
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <section className='contact'>
                    <div className='map-wrapper'>
                      <GoogleMapsContainer renderInDev />
                    </div>
                    <div className='contact-overlay text-center'>
                      <div className='section-main'>
                        {general.sitename && [
                          <img className='icon' src={iv_icon} alt={general.sitename} key='icon' />,
                          <h2 className='section-title pb-0' key='sitename'>
                            {general.sitename}
                          </h2>,
                        ]}

                        <Button size='large' ghost icon={<MailOutlined />} href='/kontakt'>
                          Kontakt oss
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
            </Container>
          </Layout.Content>
        </Layout>
      </Container>
      <FooterContainer />
    </>
  );
};
