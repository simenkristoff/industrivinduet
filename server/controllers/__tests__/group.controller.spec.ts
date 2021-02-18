import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { GroupController } from '../';
import { Group } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import groups from '../../seeds/5-groups/groups.seed';

describe('Test Group Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // Group mock
  var groupMock: Group;

  beforeAll(async (done) => {
    app = new App([new GroupController()]);
    server = app.getServer();
    instance = app.listen();
    await genTestToken().then((value) => {
      auth = value;
    });
    await seedDatabase(true, ['Group']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/groups', async (done) => {
    const result = await supertest(server).get('/api/groups').send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(groups.length);
    done();
  });

  /**
   * GET by Id
   */

  it('Request GET /api/groups/:groupID', async (done) => {
    const result = await supertest(server).get(`/api/groups/${groups[2]._id}`).send();
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(groups[2].name);
    groupMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/groups should return 401 NOT AUTHORIZED', async (done) => {
    groupMock._id = undefined;
    groupMock.name = 'Test group';
    const result = await supertest(server).post(`/api/groups`).send(groupMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request POST /api/groups', async (done) => {
    const result = await supertest(server)
      .post(`/api/groups`)
      .set('Authorization', `JWT ${auth}`)
      .send(groupMock);
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(groupMock.name);
    groupMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/groups/:groupID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).put(`/api/groups/${groupMock._id}`).send(groupMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/groups/:groupID', async (done) => {
    groupMock.name = 'Test group 2';
    const result = await supertest(server)
      .put(`/api/groups/${groupMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(groupMock);
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(groupMock.name);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/groups/:groupID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/groups/${groupMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/groups/:groupID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/groups/${groupMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
