import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { GeneralOptions, OptionState, SocialOptions } from '@/state/ducks/option/types';
import { PartnerEntity } from '@/state/ducks/partner/types';
import moment from 'moment';

import Container from './Container';
import { Socials } from './Socials';

interface IProps {
  options: OptionState;
  partners: PartnerEntity[];
  fetchPartners: () => void;
}

export const Footer: React.FC<IProps> = ({ options, partners, fetchPartners }: IProps) => {
  const general = options.general as GeneralOptions;
  const socials = options.socials as SocialOptions;

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <Layout.Footer className='site-footer'>
      <Container ghost={true}>
        <Row align='top'>
          <Col md={8} span={24}>
            <Col span={24}>
              <section className='about-section'>
                {general && <h5 className='section-title'>Om {general.sitename}</h5>}
                <div className='section-content'>
                  {general && (
                    <div className='about' dangerouslySetInnerHTML={{ __html: general.about }} />
                  )}
                </div>
              </section>
            </Col>
          </Col>
          <Col md={8} span={24}>
            <Col span={24}>
              <section className='partner-section'>
                <h5 className='section-title'>Samarbeidspartnere</h5>
                <div className='section-content'>
                  <div className='partners-wrapper'>
                    {partners &&
                      partners.map((partner) => (
                        <a className='partner' href={partner.link} key={partner._id}>
                          <img src={partner.image} alt={partner.name} />
                        </a>
                      ))}
                  </div>
                </div>
              </section>
            </Col>
          </Col>
          <Col md={8} span={24}>
            <Col span={24}>
              <section className='contact-section'>
                <h5 className='section-title'>Kontakt</h5>
                <div className='section-content'>
                  {general && (
                    <ul>
                      <li>
                        <span>E-mail: </span>
                        <a href={`mailto: ${general.email}`}>{general.email}</a>
                      </li>
                      {general.phone && (
                        <li>
                          <span>Tlf.: </span>
                          <a href={`tel: ${general.phone}`}>{general.phone}</a>
                        </li>
                      )}
                      <li>
                        <span>Org.nr.: </span>
                        {general.organization}
                      </li>
                      <li>
                        <span>Adresse: </span>
                        {general.address}
                      </li>
                    </ul>
                  )}
                </div>
              </section>
            </Col>
          </Col>
          <Socials socials={socials} className='footer-socials' />
        </Row>
        <Row align='middle'>
          <Col span={24}>
            <span className='copyrights'>
              {general.sitename} &copy; {moment(new Date()).format('yy')}. Utviklet av Simen
              Kristoffersen
            </span>
          </Col>
        </Row>
      </Container>
    </Layout.Footer>
  );
};
