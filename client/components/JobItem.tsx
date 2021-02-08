import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Descriptions, Image } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { JobEntity } from '@/state/ducks/job/types';

import { ResultItemInterface } from './ResultManager/interface';

interface IProps extends ResultItemInterface<JobEntity> {
  margin?: boolean;
  displayContent?: boolean;
}

const imageCol = {
  md: {
    span: 4,
  },
  xl: {
    span: 4,
  },
};

export const JobItem: React.FC<IProps> = ({ data, margin, className, displayContent }: IProps) => {
  const { _id, title, company, type, startdate, deadline, places, image } = data;

  return (
    <Link
      className={`job-item ${className} ${margin ? 'mb-1' : ''}`}
      to={`/stillingsannonser/${_id}`}
    >
      <Row gutter={[0, 0]} wrap={false} align='middle'>
        <div className='job-image'>
          <img src={image} alt={title} />
        </div>
        <Col className='description-wrapper' flex='auto'>
          <Descriptions
            className='job-description'
            title={title}
            colon={false}
            extra={displayContent && <span className='type'>{type}</span>}
          >
            {displayContent && (
              <div className='content'>
                <Descriptions.Item label='Søknadsfrist'>
                  {moment(deadline).format('ll')}
                </Descriptions.Item>
                <Descriptions.Item label={<EnvironmentOutlined />}>
                  {places.map((place) => place + ' ')}
                </Descriptions.Item>
              </div>
            )}
          </Descriptions>
        </Col>
      </Row>
    </Link>
  );
};

JobItem.defaultProps = {
  margin: true,
  displayContent: true,
  className: 'shadow-box-light',
};
