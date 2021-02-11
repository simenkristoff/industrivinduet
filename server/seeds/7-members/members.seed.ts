/**
 * Seed Member Documents to MongoDB
 */
import { getObjectId } from 'mongo-seeding';
import { Types } from 'mongoose';

import { MemberBase } from '../../types';
import roles from '../6-roles/roles.seed';
import { Generator } from '../generator';

interface MemberSeed extends MemberBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
}

function generateMembers(): MemberSeed[] {
  const members: Array<any> = [];
  const admin: MemberSeed = {
    _id: getObjectId('admin'),
    name: {
      first: 'Simen',
      last: 'Kristoffersen',
    },
    email: 'simen.kristoffersen98@gmail.com',
    phone: '90360922',
    image: Generator.randomPortrait(),
    role: null,
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  members.push(admin);

  const user: MemberSeed = {
    _id: getObjectId('user'),
    name: {
      first: 'Simen',
      last: 'Kristoffersen',
    },
    email: 'simen.kristoffersen98@gmail.no',
    phone: '90360922',
    image: Generator.randomPortrait(),
    role: null,
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  members.push(user);

  roles.forEach((role, index) => {
    const { name, email } = Generator.randomName();
    const phone = Generator.randomBoolean() ? Generator.randomPhone() : undefined;
    const image = Generator.randomBoolean() ? Generator.randomPortrait() : undefined;
    const member: MemberSeed = {
      _id: getObjectId(`member-${index}`),
      name,
      email,
      phone,
      image,
      role: getObjectId(role.name.replace(' ', '').toLowerCase()),
      _v: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    members.push(member);
  });

  return members;
}

export = generateMembers();
