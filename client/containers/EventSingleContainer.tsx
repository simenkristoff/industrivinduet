import React, { useEffect } from 'react';
import { IApplicationState } from '@/state/interface';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EventEntity } from '@/types';

import { EventSingle } from '@/components/EventSingle';
import { fetchEvent, setEvent } from '@/state/ducks/event/actions';

type ParamTypes = {
  eventID: string;
};

export const EventSingleContainer = () => {
  const dispatch = useDispatch();
  const event: EventEntity = useSelector(
    ({ event }: IApplicationState) => event.byId as EventEntity,
  );
  const { eventID } = useParams<ParamTypes>();

  useEffect(() => {
    dispatch(fetchEvent(eventID));

    return () => {
      dispatch(setEvent({}));
    };
  }, []);

  return <EventSingle data={event} />;
};
