import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';

import { UserModel, User, Member } from '../models';

const BCRYPT_SALT_ROUNDS = 12;

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
          if (user !== null) {
            console.log('Email is already in use.');

            return done(null, false, { message: 'Email is already in use.' });
          } else {
            // Check if the attempted user is a member
            UserModel.findMember(email).then((member: Member) => {
              if (!member) {
                console.log('Could not find member with corresponding email.');

                return done(null, false, {
                  message: 'Could not find member with corresponding email.',
                });
              } else {
                bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
                  UserModel.create({ email, password: hashedPassword, member: member._id }).then(
                    (user) => {
                      console.log('User registered!');

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
              return done(null, false, { message: 'User with that e-mail does not exist.' });
            } else {
              bcrypt.compare(password, user.password).then((response) => {
                if (response !== true) {
                  console.log('Invalid password');

                  return done(null, false, { message: 'Invalid password' });
                }
                console.log('User found and authenticated');

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
      try {
        UserModel.findById(jwtPayload.sub.id).then((user: User) => {
          if (user) {
            console.log('User found in database.');

            return done(null, user);
          } else {
            console.log('User could not be found in database.');

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
