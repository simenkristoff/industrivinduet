import jwt from 'jsonwebtoken';

import { IUser } from '../models/user.model';
import { UserModel, UserPermissions } from '../models';
import users from '../seeds/8-users/users.seed';
import { User } from '../types';

/**
 * Generate token for a given user.
 * @private
 * @param {User} user the token holder
 * @returns {string} generated token
 */
export const genToken = (user: User): string => {
  return jwt.sign(
    {
      iss: 'Industrivinduet',
      sub: {
        id: user._id,
        email: user.email,
        permissions: user.permissions,
        member: user.member,
      },
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET_KEY as string,
  );
};

/**
 * Generates a token for supertest purposes
 */
export const genTestToken = async (): Promise<string> => {
  var root: User | null = null;
  await UserModel.findOne({ email: 'admin@industrivinduet.no' }, {}, {}, (err, doc) => {
    if (doc) root = doc;
  });

  if (root !== null) {
    return jwt.sign(
      {
        iss: 'Industrivinduet',
        sub: {
          id: (root as User)._id,
          email: (root as User).email,
          permissions: (root as User).permissions,
          member: (root as User).member,
        },
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.JWT_SECRET_KEY as string,
    );
  }

  return '';
};
