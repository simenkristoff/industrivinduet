import { EventEntity } from '@/state/ducks/event/types';
import React from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import cover from '@resources/gears_card.jpg';
import moment from 'moment';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { ColProps } from 'antd/lib/col';

import { ResultItemInterface } from './ResultManager/interface';

interface IProps extends ResultItemInterface<EventEntity> {
  column?: ColProps;
}

export const EventCard: React.FC<IProps> = ({ data, column, className }: IProps) => {
  const { _id, title, type, date, starttime, endtime, place, image } = data;

  return (
    <Col {...column}>
      <Link className={`event-card shadow-box-light`} to={`/arrangementer/${_id}`}>
        <div className='card-header'>
          <img className='cover' src={cover} />
          <img className='logo' src={image} alt={title} />
        </div>
        <div className='card-body'>
          <span className='info'>
            <span className='date'>
              <CalendarOutlined />
              {`${moment(date).format('ll')} ${moment(starttime).format('HH:mm')}`}
            </span>
            <span className='place'>
              <EnvironmentOutlined />
              {place}
            </span>
          </span>
          <span className='type'>{type}</span>
          <h4 className='title'>{title}</h4>
        </div>
      </Link>
    </Col>
  );
};

EventCard.defaultProps = {
  column: {
    sm: 12,
    xs: 24,
  },
};
