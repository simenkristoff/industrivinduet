import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';

import { User, Member } from '../types';
import { Logger } from '../utils';
import { UserModel } from '../models';

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS as string;

/**
 * Register new user
 */
passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        UserModel.findOne({
          email: email,
        }).then((user: User) => {
          // Check if user is already registered
          if (user !== null && user.isRegistered) {
            Logger.debug('Email is already in use.');

            return done(new Error('Denne e-mailen er allerede registert.'), false, {
              message: 'Email is already in use.',
            });
          } else {
            // Check if the attempted user is a member
            UserModel.findMember(email).then((member: Member) => {
              if (!member) {
                Logger.debug('Could not find member with corresponding email.');

                return done(null, false, {
                  message: 'Could not find member with corresponding email.',
                });
              } else {
                console.log('error here maybe');
                bcrypt.hash(password, parseInt(BCRYPT_SALT_ROUNDS)).then((hashedPassword) => {
                  user.update(
                    {
                      password: hashedPassword,
                      isRegistered: true,
                      registerToken: undefined,
                      registerExpires: undefined,
                    },
                    { new: true },
                    (err, res) => {
                      if (err) {
                        return done(new Error('Registrering feilet.'), false, {
                          message: 'Email is already in use.',
                        });
                      }

                      Logger.debug('User registered!');

                      return done(null, user);
                    },
                  );
                });
              }
            });
          }
        });
      } catch (err: any) {
        done(err);
      }
    },
  ),
);

/**
 * Login user
 */
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        UserModel.findOne({
          email: email,
        })
          .exec()
          .then((user: User) => {
            if (user === null) {
              return done(new Error('Ingen bruker med denne e-mailen er registrert.'), false, {
                message: 'User with that e-mail does not exist.',
              });
            } else {
              bcrypt.compare(password, user.password!).then((response) => {
                if (response !== true) {
                  Logger.debug('Invalid password');

                  return done(null, false, { message: 'Invalid password' });
                }
                Logger.debug('User found and authenticated');

                return done(null, user);
              });
            }
          });
      } catch (err: any) {
        done(err);
      }
    },
  ),
);

/**
 * Verify JWT-token with Admin permissions
 */
passport.use(
  'jwt-admin',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: process.env.JWT_SECRET_KEY as string,
    },
    (jwtPayload, done) => {
      const permission = jwtPayload.sub.permissions as String;
      if (permission !== 'ADMIN') {
        Logger.debug('No permission.');

        return done(null, false);
      }
      try {
        UserModel.findById(jwtPayload.sub.id).then((user: User) => {
          if (user) {
            Logger.debug('User found in database.');

            return done(null, user);
          } else {
            Logger.debug('User could not be found in database.');

            return done(null, false);
          }
        });
      } catch (err: any) {
        done(err);
      }
    },
  ),
);

/**
 * Verify JWT-token
 */
passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: process.env.JWT_SECRET_KEY as string,
    },
    (jwtPayload, done) => {
      const permission = jwtPayload.sub.permissions as String;
      if (permission !== 'USER' && permission !== 'ADMIN') {
        Logger.debug('No permission.');

        return done(null, false);
      }
      try {
        UserModel.findById(jwtPayload.sub.id).then((user: User) => {
          if (user) {
            Logger.debug('User found in database.');

            return done(null, user);
          } else {
            Logger.debug('User could not be found in database.');

            return done(null, false);
          }
        });
      } catch (err: any) {
        done(err);
      }
    },
  ),
);

export default passport;
