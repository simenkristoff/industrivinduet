import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { StudyFieldController } from '../';
import { StudyField } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import studyfields from '../../seeds/3-studyfields/studyfields.seed';

describe('Test StudyField Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // StudyField mock
  var studyfieldMock: StudyField;

  beforeAll(async (done) => {
    app = new App([new StudyFieldController()]);
    server = app.getServer();
    instance = app.listen();
    await genTestToken().then((value) => {
      auth = value;
    });
    await seedDatabase(true, ['Studyfield']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/studyfields', async (done) => {
    const result = await supertest(server).get('/api/studyfields').send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(studyfields.length);
    done();
  });

  /**
   * GET by Id
   */

  it('Request GET /api/studyfields/:studyfieldID', async (done) => {
    const result = await supertest(server).get(`/api/studyfields/${studyfields[2]._id}`).send();
    expect(result.status).toBe(200);
    expect(result.body.abbr).toBe(studyfields[2].abbr);
    studyfieldMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/studyfields should return 401 NOT AUTHORIZED', async (done) => {
    studyfieldMock._id = undefined;
    studyfieldMock.name = 'Test studyfield';
    studyfieldMock.abbr = 'teststd';
    const result = await supertest(server).post(`/api/studyfields`).send(studyfieldMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request POST /api/studyfields', async (done) => {
    const result = await supertest(server)
      .post(`/api/studyfields`)
      .set('Authorization', `JWT ${auth}`)
      .send(studyfieldMock);
    expect(result.status).toBe(200);
    expect(result.body.abbr).toBe(studyfieldMock.abbr);
    studyfieldMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/studyfields/:studyfieldID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server)
      .put(`/api/studyfields/${studyfieldMock._id}`)
      .send(studyfieldMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/studyfields/:studyfieldID', async (done) => {
    studyfieldMock.abbr = 'Test studyfield 2';
    const result = await supertest(server)
      .put(`/api/studyfields/${studyfieldMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(studyfieldMock);
    expect(result.status).toBe(200);
    expect(result.body.abbr).toBe(studyfieldMock.abbr);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/studyfields/:studyfieldID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/studyfields/${studyfieldMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/studyfields/:studyfieldID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/studyfields/${studyfieldMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
