import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Descriptions, Image } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { EventEntity } from '@/state/ducks/event/types';

import { ResultItemInterface } from './ResultManager/interface';

const imageCol = {
  md: {
    span: 4,
  },
  xl: {
    span: 4,
  },
};

export const EventItem: React.FC<ResultItemInterface<EventEntity>> = ({
  data,
}: ResultItemInterface<EventEntity>) => {
  const { _id, title, type, date, starttime, endtime, place, image } = data;

  return (
    <Link className='event-item' to={`/arrangementer/${_id}`}>
      <Row gutter={[0, 0]} wrap={false} align='middle'>
        <div className='event-image'>
          <img src={image} alt={title} />
        </div>
        <Col className='description-wrapper' flex='auto'>
          <Descriptions
            className='event-description'
            title={title}
            colon={false}
            extra={<span className='type'>{type}</span>}
          >
            <Descriptions.Item label={<CalendarOutlined />}>
              {moment(date).format('ll')}
            </Descriptions.Item>
            <Descriptions.Item label={<ClockCircleOutlined />}>
              {moment(starttime).format('HH:mm')}
              {endtime && moment(endtime).format('-HH:mm')}
            </Descriptions.Item>
            <Descriptions.Item label={<EnvironmentOutlined />}>{place}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Link>
  );
};
