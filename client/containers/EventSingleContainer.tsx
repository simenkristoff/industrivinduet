import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IApplicationState, EventState } from '@/types';
import { EventSingle } from '@/components/EventSingle';
import { fetchEvent, setEvent } from '@/state/ducks/event/actions';

type ParamTypes = {
  eventID: string;
};

export const EventSingleContainer = () => {
  const dispatch = useDispatch();
  const event: EventState = useSelector(({ event }: IApplicationState) => event);
  const { eventID } = useParams<ParamTypes>();

  useEffect(() => {
    dispatch(fetchEvent(eventID));

    return () => {
      dispatch(setEvent({}));
    };
  }, []);

  return <EventSingle data={event.byId} loading={event.loading} />;
};
