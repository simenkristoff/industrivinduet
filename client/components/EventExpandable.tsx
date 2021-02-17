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
        <dd>{moment(starttime).format('HH:mm')}</dd>

        {endtime && [
          <dt key='label_endtime'>Slutter: </dt>,
          <dd key='value_endtime'>{moment(endtime).format('HH:mm')}</dd>,
        ]}
      </dl>

      <dl>
        <dt>Sted: </dt>
        <dd>{place}</dd>

        {dining && [<dt key='label_dining'>Bespisning: </dt>, <dd key='value_dining'>{dining}</dd>]}
      </dl>
    </div>
  );
};
