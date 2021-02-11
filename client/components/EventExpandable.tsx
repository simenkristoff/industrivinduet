import React from 'react';
import { Image } from 'antd';
import moment from 'moment';
import { EventEntity } from '@/types';

export const EventExpandable: React.FC<EventEntity> = ({
  image,
  title,
  starttime,
  endtime,
  place,
  dining,
}: EventEntity) => {
  return (
    <div className='table-col-expanded'>
      <Image src={image} width={100} />

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
