import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { RoleController } from '../';
import { Role } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import roles from '../../seeds/6-roles/roles.seed';

describe('Test Role Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // Role mock
  var roleMock: Role;

  beforeAll(async (done) => {
    app = new App([new RoleController()]);
    server = app.getServer();
    instance = app.listen();
    await genTestToken().then((value) => {
      auth = value;
    });
    await seedDatabase(true, ['Role']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/roles', async (done) => {
    const result = await supertest(server).get('/api/roles').send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(roles.length);
    done();
  });

  /**
   * GET by Id
   */

  it('Request GET /api/roles/:roleID', async (done) => {
    const result = await supertest(server).get(`/api/roles/${roles[2]._id}`).send();
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(roles[2].name);
    roleMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/roles should return 401 NOT AUTHORIZED', async (done) => {
    roleMock._id = undefined;
    roleMock.name = 'Test role';
    const result = await supertest(server).post(`/api/roles`).send(roleMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request POST /api/roles', async (done) => {
    const result = await supertest(server)
      .post(`/api/roles`)
      .set('Authorization', `JWT ${auth}`)
      .send(roleMock);
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(roleMock.name);
    roleMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/roles/:roleID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).put(`/api/roles/${roleMock._id}`).send(roleMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/roles/:roleID', async (done) => {
    roleMock.name = 'Test role 2';
    const result = await supertest(server)
      .put(`/api/roles/${roleMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(roleMock);
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(roleMock.name);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/roles/:roleID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/roles/${roleMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/roles/:roleID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/roles/${roleMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
