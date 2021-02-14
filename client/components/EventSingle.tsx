import React from 'react';
import _ from 'lodash';
import { Row, Col, Button, Descriptions } from 'antd';
import moment from 'moment';

import { EventEntity, MemberEntity } from '@/types';
import { MemberCard } from '@/components/MemberCard';
import { Spinner } from '@/components/Spinner';

interface IProps {
  data: EventEntity | {};
  loading: boolean;
}

const BACKEND_URL = process.env.BACKEND_URL as string;

export const EventSingle: React.FC<IProps> = ({ data, loading }: IProps) => {
  var sortedGrades: string[] = [];
  const {
    title,
    type,
    date,
    starttime,
    endtime,
    place,
    dining,
    description,
    image,
    member,
    studyfields,
    grades,
    link,
  } = data as EventEntity;

  if (grades) {
    sortedGrades = grades.sort((a, b) => {
      return parseInt(a) - parseInt(b);
    });
  }

  const render = () => {
    if (loading || _.isEmpty(data)) {
      return <Spinner loading centered />;
    }

    return (
      <div className='single event-single'>
        <Row className='header border-light-bottom'>
          <Col md={4} sm={6} span={24} className='logo-wrapper'>
            <img src={`${BACKEND_URL}/media/${image}`} alt={title} className='logo event-logo' />
          </Col>
          <Col md={14} sm={12} span={24} className='title-wrapper'>
            <h3 className='type event-type'>{type}</h3>
            <h1 className='title event-title'>{title}</h1>
          </Col>
          <Col md={6} sm={6} span={24} className='action-section'>
            <Button type='primary' size='large' href={link}>
              Meld deg på
            </Button>
          </Col>
        </Row>
        <Row className='info-section'>
          <Col span={24}>
            <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 4 }} layout='horizontal'>
              <Descriptions.Item label='Dato'>{moment(date).format('ll')}</Descriptions.Item>
              <Descriptions.Item label='Starter'>
                {moment(starttime).format('HH:mm')}
              </Descriptions.Item>
              {endtime && (
                <Descriptions.Item label='Slutter'>
                  {moment(endtime).format('HH:mm')}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Col>
        </Row>
        <Row>
          <Col md={18} className='context'>
            <h4>Beskrivelse</h4>
            <div className='content' dangerouslySetInnerHTML={{ __html: description }} />
            {member && (
              <div className='contact'>
                <h5 className='contact-title'>Ved spørsmål, ta kontakt med</h5>
                <MemberCard data={member as MemberEntity} borderShadow={false} />
              </div>
            )}
          </Col>
          <Col md={6} className='sider'>
            <div className='sider-info'>
              <Descriptions column={1} layout='vertical'>
                <Descriptions.Item label='Sted'>{place}</Descriptions.Item>
                {dining && <Descriptions.Item label='Bespisning'>{dining}</Descriptions.Item>}
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
      </div>
    );
  };

  return render();
};
