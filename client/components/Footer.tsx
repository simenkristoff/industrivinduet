import React, { useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import moment from 'moment';

import { GeneralOptions, OptionState, SocialOptions, PartnerEntity } from '@/types';
import { Container } from '@/components/Container';
import { Socials } from '@/components/Socials';

interface IProps {
  options: OptionState;
  partners: PartnerEntity[];
  fetchPartners: () => void;
}

const BACKEND_URL = process.env.BACKEND_URL as string;

/**
 * Renders the site footer
 */
export const Footer: React.FC<IProps> = ({ options, partners, fetchPartners }: IProps) => {
  const general = options.general as GeneralOptions;
  const socials = options.socials as SocialOptions;

  useEffect(() => {
    fetchPartners();
  }, []);

  const renderSections = () => {
    if (Object.keys(general).length > 0 && Object.keys(socials).length > 0) {
      return [
        <Col md={8} span={24} key='about'>
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
        </Col>,
        <Col md={8} span={24} key='partners'>
          <Col span={24}>
            <section className='partner-section'>
              <h5 className='section-title'>Samarbeidspartnere</h5>
              <div className='section-content'>
                <div className='partners-wrapper'>
                  {partners &&
                    partners.map((partner) => (
                      <a className='partner' href={partner.link} key={partner._id}>
                        <img src={`${BACKEND_URL}/media/${partner.image}`} alt={partner.name} />
                      </a>
                    ))}
                </div>
              </div>
            </section>
          </Col>
        </Col>,
        <Col md={8} span={24} key='contact'>
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
        </Col>,
        <Socials key='social-icons' socials={socials} className='footer-socials' />,
      ];
    }

    return null;
  };

  return (
    <Layout.Footer className='site-footer'>
      <Container ghost={true}>
        <Row align='top'>{renderSections()}</Row>
        <Row align='middle'>
          <Col span={24}>
            {general.sitename && (
              <span className='copyrights'>
                {general.sitename} &copy; {moment(new Date()).format('yy')}. Utviklet av Simen
                Kristoffersen
              </span>
            )}
          </Col>
        </Row>
      </Container>
    </Layout.Footer>
  );
};
