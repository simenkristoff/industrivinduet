import { getObjectId } from 'mongo-seeding';
import { Types } from 'mongoose';

import { EventBase } from '../../models';
import { Generator } from '../generator';

interface EventSeed extends EventBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
}

function generateEvents(): EventSeed[] {
  const events: EventSeed[] = [];
  for (var i = 0; i < 10; i++) {
    const type = Generator.randomEventType();
    const company = Generator.randomCompany();
    const title = `${type} med ${company.name}`;
    const endtime = Generator.randomBoolean() ? Generator.randomDate() : undefined;
    const dining = Generator.randomBoolean() ? Generator.randomCampusPlace() : undefined;
    const date = Generator.randomDate();
    const event: EventSeed = {
      _id: getObjectId(`event-${i}`),
      title,
      type,
      date,
      starttime: Generator.randomDate(),
      endtime,
      place: Generator.randomCampusPlace(),
      dining,
      description: Generator.generateDescription(Math.floor(Math.random() * 5)),
      grades: Generator.randomGrades(),
      image: company.logo,
      link: company.link,
      studyfields: Generator.randomStudyFields(),
      member: Generator.randomMember(),
      active: new Date().getTime() <= date.getTime() ? true : false,
      createdAt: new Date(),
      updatedAt: new Date(),
      _v: 0,
    };
    events.push(event);
  }

  return events;
}

export = generateEvents();
