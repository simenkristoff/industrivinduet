import React from 'react';
import { Image } from 'antd';
import moment from 'moment';

import { EventEntity } from '@/types';

const BACKEND_URL = process.env.BACKEND_URL as string;

/**
 * Renders expandable details in a table of Events entities.
 */
export const EventExpandable: React.FC<EventEntity> = ({
  image,
  starttime,
  endtime,
  place,
  dining,
}: EventEntity) => {
  return (
    <div className='table-col-expanded'>
      <Image src={`${BACKEND_URL}/media/${image}`} width={100} />

      <dl>
        <dt>Starter: </dt>
        <dd className='starttime'>{moment(starttime).format('HH:mm')}</dd>

        {endtime && [
          <dt key='label_endtime'>Slutter: </dt>,
          <dd className='endtime' key='value_endtime'>
            {moment(endtime).format('HH:mm')}
          </dd>,
        ]}
      </dl>

      <dl>
        <dt>Sted: </dt>
        <dd className='place'>{place}</dd>

        {dining && [
          <dt key='label_dining'>Bespisning: </dt>,
          <dd className='dining' key='value_dining'>
            {dining}
          </dd>,
        ]}
      </dl>
    </div>
  );
};
