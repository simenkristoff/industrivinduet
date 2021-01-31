import React from 'react';
import { Image } from 'antd';
import { EventEntity } from '@/state/ducks/event/types';
import moment from 'moment';

const EventExpandable: React.FC<EventEntity> = ({
  image,
  title,
  starttime,
  endtime,
  place,
  dining,
}: EventEntity) => {
  return (
    <div className='table-col-expanded'>
      {/* <div className='col-img'>
        <img src={image} alt={title} />
      </div> */}
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

export default EventExpandable;
