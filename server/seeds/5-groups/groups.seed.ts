/**
 * Seed Group Documents to MongoDB
 */
import { getObjectId } from 'mongo-seeding';
import { Types } from 'mongoose';

import { GroupBase } from '../../types';

interface GroupSeed extends GroupBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
}

const groups: GroupSeed[] = [
  {
    _id: getObjectId('promo'),
    name: 'Promo',
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 0,
  },
  {
    _id: getObjectId('økonomi'),
    name: 'Økonomi',
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 0,
  },
  {
    _id: getObjectId('bedrift'),
    name: 'Bedrift',
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 0,
  },
  {
    _id: getObjectId('event'),
    name: 'Event',
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 0,
  },
];

export = groups;
