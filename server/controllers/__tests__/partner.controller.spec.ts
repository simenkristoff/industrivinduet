import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { PartnerController } from '../';
import { Partner } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import partners from '../../seeds/4-partners/partners.seed';

describe('Test Partner Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // Partner mock
  var partnerMock: Partner;

  beforeAll(async (done) => {
    app = new App([new PartnerController()]);
    server = app.getServer();
    instance = app.listen();
    await seedDatabase(true, ['Partner']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/partners', async (done) => {
    const result = await supertest(server).get('/api/partners').send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(partners.length);
    done();
  });

  /**
   * GET by Id
   */

  it('Request GET /api/partners/:partnerID', async (done) => {
    const result = await supertest(server).get(`/api/partners/${partners[0]._id}`).send();
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(partners[0].name);
    partnerMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/partners should return 401 NOT AUTHORIZED', async (done) => {
    partnerMock._id = undefined;
    partnerMock.name = 'Test partner';
    const result = await supertest(server).post(`/api/partners`).send(partnerMock);
    expect(result.status).toBe(401);
    await genTestToken().then((value) => {
      auth = value;
    });
    done();
  });

  it('Request POST /api/partners', async (done) => {
    const result = await supertest(server)
      .post(`/api/partners`)
      .set('Authorization', `JWT ${auth}`)
      .send(partnerMock);
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(partnerMock.name);
    partnerMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/partners/:partnerID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server)
      .put(`/api/partners/${partnerMock._id}`)
      .send(partnerMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/partners/:partnerID', async (done) => {
    partnerMock.name = 'Test partner 2';
    const result = await supertest(server)
      .put(`/api/partners/${partnerMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(partnerMock);
    expect(result.status).toBe(200);
    expect(result.body.name).toBe(partnerMock.name);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/partners/:partnerID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/partners/${partnerMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/partners/:partnerID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/partners/${partnerMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
