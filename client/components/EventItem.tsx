import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Descriptions } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

import { ResultItemInterface, EventEntity } from '@/types';

interface IProps extends ResultItemInterface<EventEntity> {
  displayContent?: boolean;
}

const BACKEND_URL = process.env.BACKEND_URL as string;

export const EventItem: React.FC<IProps> = ({ data, className, displayContent }: IProps) => {
  const { _id, title, type, date, starttime, endtime, place, image } = data;

  return (
    <Link className={`event-item ${className}`} to={`/arrangementer/${_id}`}>
      <Row gutter={[0, 0]} wrap={false} align='middle'>
        <div className='event-image'>
          <img src={`${BACKEND_URL}/media/${image}`} alt={title} />
        </div>

        <Col className='description-wrapper' flex='auto'>
          <Descriptions
            className='event-description'
            layout='horizontal'
            title={title}
            colon={false}
            extra={displayContent && <span className='type'>{type}</span>}
          >
            {displayContent && [
              <Descriptions.Item label={<CalendarOutlined />} key='date'>
                {moment(date).format('ll')}
              </Descriptions.Item>,
              <Descriptions.Item label={<ClockCircleOutlined />} key='time'>
                {moment(starttime).format('HH:mm')}
                {endtime && moment(endtime).format('-HH:mm')}
              </Descriptions.Item>,
              <Descriptions.Item label={<EnvironmentOutlined />} key='location'>
                {place}
              </Descriptions.Item>,
            ]}
          </Descriptions>
        </Col>
      </Row>
    </Link>
  );
};

EventItem.defaultProps = {
  displayContent: true,
};
