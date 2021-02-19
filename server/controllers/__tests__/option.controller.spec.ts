import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { OptionController } from '../';
import { Option } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import options from '../../seeds/1-options/options.seed';

describe('Test Option Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // Option mock
  var optionMock: Option;

  beforeAll(async (done) => {
    app = new App([new OptionController()]);
    server = app.getServer();
    instance = app.listen();
    await seedDatabase(true, ['Option']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/options', async (done) => {
    const result = await supertest(server).get('/api/options').send();
    expect(result.status).toBe(200);
    expect(Object.keys(result.body).length).toBeGreaterThan(1);
    optionMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/options should return 401 NOT AUTHORIZED', async (done) => {
    optionMock.general.sitename = 'testname';
    const result = await supertest(server).put(`/api/options`).send(optionMock);
    expect(result.status).toBe(401);
    await genTestToken().then((value) => {
      auth = value;
    });
    done();
  });

  it('Request PUT /api/options', async (done) => {
    const result = await supertest(server)
      .put(`/api/options`)
      .set('Authorization', `JWT ${auth}`)
      .send(optionMock);
    expect(result.status).toBe(200);
    expect(result.body.general.sitename).toBe(optionMock.general.sitename);
    done();
  });

  /**
   * DELETE reset
   */
  it('Request DELETE /api/options should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/options`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/options', async (done) => {
    const result = await supertest(server)
      .delete(`/api/options`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
