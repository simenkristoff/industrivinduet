import React from 'react';
import { Row, Col, Spin } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

import { GeneralOptions, OptionState, SocialOptions } from '@/state/ducks/option/types';
import { GoogleMapsContainer } from '@/containers/GoogleMapsContainer';

import { Socials } from './Socials';

interface IProps {
  options: OptionState;
}

export const Contact: React.FC<IProps> = ({ options }: IProps) => {
  const general = options.general as GeneralOptions;
  const socials = options.socials as SocialOptions;
  if (!general || !socials) {
    return <Spin />;
  }

  return (
    <div className='contact-wrapper'>
      <Row>
        <Col md={12} span={24}>
          <h1 className='pb-1 mb-2'>Kontaktinformasjon</h1>
          <div className='pb-2'>
            <h3>
              E-mail
              <MailOutlined className='pl-1' />
            </h3>
            <a href={`mailto: ${general.email}`}>{general.email}</a>
          </div>

          {general.phone && (
            <div className='pb-2'>
              <h3>
                Telefonnummer
                <PhoneOutlined className='pl-1' />
              </h3>
              <a href={`tel: ${general.phone}`}>{general.phone}</a>
            </div>
          )}

          <div className='pb-2'>
            <h3>
              Adresse
              <EnvironmentOutlined className='pl-1' />
            </h3>
            <span>{general.address}</span>
          </div>

          <Socials socials={socials} theme='primary' size='large' />
        </Col>
        <Col md={12} span={24}>
          <GoogleMapsContainer />
        </Col>
      </Row>
    </div>
  );
};
