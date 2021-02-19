import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { UserController } from '../';
import { User } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import users from '../../seeds/8-users/users.seed';

describe('Test User Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // User mock
  var userMock: User;

  beforeAll(async (done) => {
    app = new App([new UserController()]);
    instance = app.listen();
    server = app.getServer();
    await seedDatabase(true, ['User']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/users return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).get(`/api/users`).send();
    expect(result.status).toBe(401);
    await genTestToken().then((value) => {
      auth = value;
    });
    done();
  });

  it('Request GET /api/users', async (done) => {
    const result = await supertest(server)
      .get('/api/users')
      .set('Authorization', `JWT ${auth}`)
      .send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(users.length + 1);
    done();
  });

  /**
   * GET by Id
   */
  it('Request GET /api/users/:userID return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).get(`/api/users/${users[1]._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request GET /api/users/:userID', async (done) => {
    const result = await supertest(server)
      .get(`/api/users/${users[1]._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.email).toBe(users[1].email);
    userMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/users should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).post(`/api/users`).send(userMock);
    expect(result.status).toBe(401);
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/users/:userID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).put(`/api/users/${userMock._id}`).send(userMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/users/:userID', async (done) => {
    userMock.email = 'user@test.com';
    const result = await supertest(server)
      .put(`/api/users/${userMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(userMock);
    expect(result.status).toBe(200);
    expect(result.body.email).toBe(userMock.email);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/users/:userID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/users/${userMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/users/:userID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/users/${userMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
