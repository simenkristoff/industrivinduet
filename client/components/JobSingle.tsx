import React from 'react';
import _ from 'lodash';
import { Row, Col, Button, Descriptions } from 'antd';
import moment from 'moment';

import { JobEntity } from '@/types';
import { Container } from '@/components/Container';
import { Spinner } from '@/components/Spinner';

interface IProps {
  data: JobEntity | {};
  loading: boolean;
}

const BACKEND_URL = process.env.BACKEND_URL as string;

export const JobSingle: React.FC<IProps> = ({ data, loading }: IProps) => {
  var sortedGrades: string[] = [];
  const {
    title,
    type,
    company,
    deadline,
    startdate,
    places,
    description,
    image,
    studyfields,
    grades,
    link,
  } = data as JobEntity;

  if (grades) {
    sortedGrades = grades.sort((a, b) => {
      return parseInt(a) - parseInt(b);
    });
  }

  console.log(sortedGrades);
  const render = () => {
    if (loading || _.isEmpty(data)) {
      return <Spinner loading centered />;
    }

    return (
      <Container className='single job-single'>
        <Row className='header border-light-bottom'>
          <Col md={4} sm={6} span={24} className='logo-wrapper'>
            <img src={`${BACKEND_URL}/media/${image}`} alt={company} className='logo job-logo' />
          </Col>
          <Col md={14} sm={12} span={24} className='title-wrapper'>
            <h3 className='type job-type'>{type}</h3>
            <h1 className='title job-title'>{title}</h1>
          </Col>
          <Col md={6} sm={6} span={24} className='action-section'>
            <Button type='primary' size='large' href={link}>
              Gå til søknad
            </Button>
          </Col>
        </Row>
        <Row className='info-section'>
          <Col span={24}>
            <Descriptions layout='horizontal'>
              <Descriptions.Item label='Søknadsfrist'>
                {moment(deadline).format('lll')}
              </Descriptions.Item>
              {startdate && (
                <Descriptions.Item label='Startdato'>
                  {moment(startdate).format('ll')}
                </Descriptions.Item>
              )}
              <Descriptions.Item label='Bedrift'>{company}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row>
          <Col md={18} className='context'>
            <h4>Beskrivelse</h4>
            <div className='content' dangerouslySetInnerHTML={{ __html: description }} />
          </Col>
          <Col md={6} className='sider'>
            <div className='sider-info'>
              <Descriptions column={1} layout='vertical'>
                <Descriptions.Item label='Steder'>
                  <ul className='places'>
                    {places?.map((places) => (
                      <li key={places}>{places}</li>
                    ))}
                  </ul>
                </Descriptions.Item>
                <Descriptions.Item label='Studieretninger'>
                  <ul className='studyfields'>
                    {studyfields?.map((studyfield) => (
                      <li key={studyfield._id}>{studyfield.name}</li>
                    ))}
                  </ul>
                </Descriptions.Item>
                <Descriptions.Item label='Klassetrinn' className='grades'>
                  {sortedGrades?.map((grade) => (
                    <span className='grade' key={grade}>
                      {grade}
                    </span>
                  ))}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  return render();
};
