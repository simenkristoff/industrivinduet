import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { MemberController } from '../';
import { Member } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import members from '../../seeds/7-members/members.seed';

describe('Test Member Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // Member mock
  var memberMock: Member;

  beforeAll(async (done) => {
    app = new App([new MemberController()]);
    server = app.getServer();
    instance = app.listen();
    await seedDatabase(true, ['Member']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/members', async (done) => {
    const result = await supertest(server).get('/api/members').send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(members.length);
    done();
  });

  /**
   * GET by Id
   */

  it('Request GET /api/members/:memberID', async (done) => {
    const result = await supertest(server).get(`/api/members/${members[2]._id}`).send();
    expect(result.status).toBe(200);
    expect(result.body.name.first).toBe(members[2].name.first);
    memberMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/members should return 401 NOT AUTHORIZED', async (done) => {
    memberMock._id = undefined;
    memberMock.name.first = 'Test Member';
    memberMock.email = 'test.member@test.no'; // unique email
    const result = await supertest(server).post(`/api/members`).send(memberMock);
    expect(result.status).toBe(401);
    await genTestToken().then((value) => {
      auth = value;
    });
    done();
  });

  it('Request POST /api/members', async (done) => {
    const result = await supertest(server)
      .post(`/api/members`)
      .set('Authorization', `JWT ${auth}`)
      .send(memberMock);
    expect(result.status).toBe(200);
    expect(result.body.name.first).toBe(memberMock.name.first);
    memberMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/members/:memberID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).put(`/api/members/${memberMock._id}`).send(memberMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/members/:memberID', async (done) => {
    memberMock.name.first = 'Test member 2';
    const result = await supertest(server)
      .put(`/api/members/${memberMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(memberMock);
    expect(result.status).toBe(200);
    expect(result.body.name.first).toBe(memberMock.name.first);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/members/:memberID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/members/${memberMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/members/:memberID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/members/${memberMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
