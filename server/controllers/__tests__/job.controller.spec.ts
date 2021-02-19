import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { JobController } from '../';
import { Job } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import jobs from '../../seeds/10-jobs/jobs.seed';

describe('Test Job Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // Job mock
  var jobMock: Job;

  beforeAll(async (done) => {
    app = new App([new JobController()]);
    server = app.getServer();
    instance = app.listen();
    await seedDatabase(true, ['Job']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/jobs', async (done) => {
    const result = await supertest(server).get('/api/jobs').send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(jobs.length);
    done();
  });

  it('Request GET /api/jobs for active jobs', async (done) => {
    const result = await supertest(server).get('/api/jobs/active').send();

    expect(result.status).toBe(200);
    const jobs: Job[] = result.body;
    expect(jobs.every((job) => job.active === true)).toBeTruthy();
    done();
  });

  /**
   * GET by Id
   */

  it('Request GET /api/jobs/:jobID', async (done) => {
    const result = await supertest(server).get(`/api/jobs/${jobs[2]._id}`).send();
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(jobs[2].title);
    jobMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/jobs should return 401 NOT AUTHORIZED', async (done) => {
    jobMock._id = undefined;
    jobMock.title = 'Test job';
    const result = await supertest(server).post(`/api/jobs`).send(jobMock);
    expect(result.status).toBe(401);
    await genTestToken().then((value) => {
      auth = value;
    });
    done();
  });

  it('Request POST /api/jobs', async (done) => {
    const result = await supertest(server)
      .post(`/api/jobs`)
      .set('Authorization', `JWT ${auth}`)
      .send(jobMock);
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(jobMock.title);
    jobMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/jobs/:jobID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).put(`/api/jobs/${jobMock._id}`).send(jobMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/jobs/:jobID', async (done) => {
    jobMock.title = 'Test job 2';
    const result = await supertest(server)
      .put(`/api/jobs/${jobMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(jobMock);
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(jobMock.title);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/jobs/:jobID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/jobs/${jobMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/jobs/:jobID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/jobs/${jobMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
