/**
 * Seed Role Documents to MongoDB
 */
import { getObjectId } from 'mongo-seeding';
import { Types } from 'mongoose';

import { RoleBase } from '../../types';

interface RoleSeed extends RoleBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
}
const roles: RoleSeed[] = [
  {
    _id: getObjectId('dagligleder'),
    name: 'Daglig leder',
    roleType: 'Leder',
    group: null,
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('nestleder'),
    name: 'Nestleder',
    roleType: 'Nestleder',
    group: null,
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('bedriftssjef'),
    name: 'Bedriftssjef',
    roleType: 'Leder',
    group: getObjectId('bedrift'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('rekrutteringsansvarlig'),
    name: 'Rekrutteringsansvarlig',
    roleType: 'Medlem',
    group: getObjectId('bedrift'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('maskindagenansvarlig'),
    name: 'Maskindagenansvarlig',
    roleType: 'Medlem',
    group: getObjectId('bedrift'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('promosjef'),
    name: 'Promosjef',
    roleType: 'Leder',
    group: getObjectId('promo'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('webansvarlig'),
    name: 'Webansvarlig',
    roleType: 'Medlem',
    group: getObjectId('promo'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('mediaansvarlig'),
    name: 'Mediaansvarlig',
    roleType: 'Medlem',
    group: getObjectId('promo'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('eventsjef'),
    name: 'Eventsjef',
    roleType: 'Leder',
    group: getObjectId('event'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('instituttansvarlig'),
    name: 'Instituttansvarlig',
    roleType: 'Medlem',
    group: getObjectId('event'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('sosialansvarlig'),
    name: 'Sosialansvarlig',
    roleType: 'Medlem',
    group: getObjectId('event'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('ekskursjonsansvarlig'),
    name: 'Ekskursjonsansvarlig',
    roleType: 'Medlem',
    group: getObjectId('event'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('økonomisjef'),
    name: 'Økonomisjef',
    roleType: 'Leder',
    group: getObjectId('økonomi'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('sponsoransvarlig'),
    name: 'Sponsoransvarlig',
    roleType: 'Medlem',
    group: getObjectId('økonomi'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('cowiansvarlig'),
    name: 'COWI ansvarlig',
    roleType: 'Medlem',
    group: getObjectId('økonomi'),
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export = roles;
