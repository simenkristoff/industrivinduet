import React from 'react';
import { isEmpty } from 'lodash';
import { Layout, Row, Col, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import { GeneralOptions, EventEntity, JobEntity, PartnerEntity } from '@/types';
import { Container } from '@/components/Container';
import { EventCard } from '@/components/EventCard';
import { JobItem } from '@/components/JobItem';
import { PartnerCard } from '@/components/PartnerCard';
import { Spinner } from '@/components/Spinner';
import { HeaderContainer } from '@/containers/HeaderContainer';
import { GoogleMapsContainer } from '@/containers/GoogleMapsContainer';
import { FooterContainer } from '@/containers/FooterContainer';
import iv_icon from '@resources/icons/iv_icon.png';
import smorekoppen from '@resources/covers/smorekoppen_cover.jpg';

interface IProps {
  generalOptions: GeneralOptions | {};
  events: {
    data: EventEntity[];
    display: boolean;
    loading: boolean;
    colSize: number;
  };
  jobs: {
    data: JobEntity[];
    display: boolean;
    loading: boolean;
  };
  partners: {
    data: PartnerEntity[];
    loading: boolean;
  };
}

export const Frontpage: React.FC<IProps> = ({ generalOptions, events, jobs, partners }: IProps) => {
  const renderEventSection = () => {
    if (!events.display || events.data.length < 1) return null;
    else if (events.loading) {
      return (
        <section className='events'>
          <Container className='events-wrapper'>
            <Spinner loading={events.loading} centered />
          </Container>
        </section>
      );
    }

    return (
      <section className='events'>
        <Container className='events-wrapper'>
          <Row gutter={[16, 16]} justify='center'>
            {events.data.length > 0 &&
              events.data.map((event) => (
                <EventCard
                  key={event._id}
                  cover='ntnu'
                  data={event}
                  column={{ sm: events.colSize }}
                  scaleOnHover
                  className='bg-light'
                />
              ))}
          </Row>
        </Container>
      </section>
    );
  };

  const renderJobSection = () => {
    if (!jobs.display || jobs.data.length < 1) return null;
    else if (jobs.loading) {
      return (
        <Col md={16} sm={24}>
          <section className='jobs'>
            <div className='section-header'>
              <h3 className='section-title'>Stillingsannonser</h3>
            </div>
            <Spinner loading={jobs.loading} centered />
          </section>
        </Col>
      );
    }

    return (
      <Col md={16} sm={24}>
        <section className='jobs'>
          <div className='section-header'>
            <h3 className='section-title'>Stillingsannonser</h3>
          </div>
          {jobs.data.map((job) => (
            <JobItem className='' data={job} key={job._id} margin={false} />
          ))}
        </section>
      </Col>
    );
  };

  const renderPartnerSection = () => {
    if (partners.data.length < 1) return null;
    else if (partners.loading) {
      return (
        <Col md={jobs.display ? 8 : 24} sm={24} className='partners-wrapper'>
          <section className='partners'>
            <div className='section-header'>
              <h3 className='section-title'>Samarbeidspartnere</h3>
            </div>
            <Spinner loading={partners.loading} centered />
          </section>
        </Col>
      );
    }

    return (
      <Col md={jobs.display ? 8 : 24} sm={24} className='partners-wrapper'>
        <section className='partners'>
          <div className='section-header'>
            <h3 className='section-title'>Samarbeidspartnere</h3>
          </div>
          {partners.data.map((partner) => (
            <PartnerCard data={partner} key={partner._id} />
          ))}
        </section>
      </Col>
    );
  };

  const renderContactSection = () => {
    var options = generalOptions as GeneralOptions;
    if (isEmpty(options) || !options.showMaps) return null;

    return (
      <Col span={24}>
        <section className='contact'>
          <div className='map-wrapper'>
            <GoogleMapsContainer />
          </div>
          <div className='contact-overlay text-center'>
            <div className='section-main'>
              {options.sitename && [
                <img className='icon' src={iv_icon} alt={options.sitename} key='icon' />,
                <h2 className='section-title pb-0' key='sitename'>
                  {options.sitename}
                </h2>,
              ]}

              <Button size='large' ghost icon={<MailOutlined />} href='/kontakt'>
                Kontakt oss
              </Button>
            </div>
          </div>
        </section>
      </Col>
    );
  };

  return (
    <>
      <HeaderContainer />
      <Container className='frontpage-wrapper bg-gradient-blue' size='full'>
        <Layout>
          <Layout.Content className='main-content'>
            {renderEventSection()}

            <Container className='content-wrapper'>
              <Row gutter={[16, 16]}>
                {renderPartnerSection()}
                {renderJobSection()}
              </Row>
              <Row gutter={[16, 16]}>{renderContactSection()}</Row>
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
