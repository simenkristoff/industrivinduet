/**
 * Seed User Documents to MongoDB
 */
import { getObjectId } from 'mongo-seeding';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { UserBase } from '../../types';
import { UserPermissions } from '../../models';

const BCRYPT_SALT_ROUNDS = 12;

interface UserSeed extends UserBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
}

const users: UserSeed[] = [
  {
    _id: getObjectId('auth-admin'),
    permissions: UserPermissions.ADMIN,
    email: 'simen.kristoffersen98@gmail.com',
    password: bcrypt.hashSync('123456', BCRYPT_SALT_ROUNDS),
    isRoot: false,
    isRegistered: true,
    member: getObjectId('admin'),
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 0,
  },
  {
    _id: getObjectId('auth-user'),
    permissions: UserPermissions.USER,
    email: 'simen.kristoffersen98@gmail.no',
    password: bcrypt.hashSync('123456', BCRYPT_SALT_ROUNDS),
    isRoot: false,
    isRegistered: true,
    member: getObjectId('user'),
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 0,
  },
];

export = users;
