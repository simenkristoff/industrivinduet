/* globals expect it */
import { UserModel } from '../../models';

const { setupDB } = require('../../setup-test');

setupDB('seed', true);

it('Seeding test', async (done) => {
  const users = await UserModel.find({});
  expect(users.length).toBe(3);

  // Make sure password is hashed
  const firstUser = users[0];
  const isCorrectlyHashed = firstUser.verifyPassword('12345678');
  expect(isCorrectlyHashed).toBe(true);

  done();
});
