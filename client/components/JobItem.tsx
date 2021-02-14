import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Descriptions } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

import { JobEntity } from '@/types';
import { ResultItemInterface } from '@/components/ResultManager/interface';

interface IProps extends ResultItemInterface<JobEntity> {
  margin?: boolean;
  displayPlaces?: boolean;
  displayContent?: boolean;
}

const BACKEND_URL = process.env.BACKEND_URL as string;

export const JobItem: React.FC<IProps> = ({
  data,
  margin,
  className,
  displayPlaces,
  displayContent,
}: IProps) => {
  const { _id, title, company, type, startdate, deadline, places, image } = data;

  return (
    <Link
      className={`job-item ${className} ${margin ? 'mb-1' : ''}`}
      to={`/stillingsannonser/${_id}`}
    >
      <Row gutter={[0, 0]} wrap={false} align='middle'>
        <div className='job-image'>
          <img src={`${BACKEND_URL}/media/${image}`} alt={title} />
        </div>
        <Col className='description-wrapper' flex='auto'>
          <Descriptions
            className='job-description'
            layout='horizontal'
            column={{ xs: 1, sm: 1, md: 2, lg: 4 }}
            title={title}
            colon={false}
            extra={displayContent && <span className='type'>{type}</span>}
          >
            {displayContent && [
              <Descriptions.Item label='Søknadsfrist' key='deadline'>
                {moment(deadline).format('ll')}
              </Descriptions.Item>,
              <Descriptions.Item
                className={displayPlaces ? '' : 'hide'}
                label={<EnvironmentOutlined />}
                key='location'
              >
                {places.map((place) => place + ' ')}
              </Descriptions.Item>,
            ]}
          </Descriptions>
        </Col>
      </Row>
    </Link>
  );
};

JobItem.defaultProps = {
  margin: true,
  displayPlaces: true,
  displayContent: true,
  className: 'shadow-box-light',
};
