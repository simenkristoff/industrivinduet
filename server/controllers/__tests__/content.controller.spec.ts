import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { ContentController } from '../';
import { Content } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import contents from '../../seeds/2-contents/contents.seed';

describe('Test Content Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // Content mock
  var contentMock: Content;

  beforeAll(async (done) => {
    app = new App([new ContentController()]);
    server = app.getServer();
    instance = app.listen();
    await genTestToken().then((value) => {
      auth = value;
    });
    await seedDatabase(true, ['Content']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/contents', async (done) => {
    const result = await supertest(server).get('/api/contents').send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(contents.length);
    done();
  });

  /**
   * GET by Id
   */

  it('Request GET /api/contents/:contentID', async (done) => {
    const result = await supertest(server).get(`/api/contents/${contents[2]._id}`).send();
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(contents[2].title);
    contentMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/contents should return 401 NOT AUTHORIZED', async (done) => {
    contentMock._id = undefined;
    contentMock.title = 'Test content';
    contentMock.linkText = 'Test content here';
    contentMock.priority = 10;
    const result = await supertest(server).post(`/api/contents`).send(contentMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request POST /api/contents', async (done) => {
    const result = await supertest(server)
      .post(`/api/contents`)
      .set('Authorization', `JWT ${auth}`)
      .send(contentMock);
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(contentMock.title);
    contentMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/contents/:contentID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server)
      .put(`/api/contents/${contentMock._id}`)
      .send(contentMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/contents/:contentID', async (done) => {
    contentMock.title = 'Test content 2';
    const result = await supertest(server)
      .put(`/api/contents/${contentMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(contentMock);
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(contentMock.title);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/contents/:contentID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/contents/${contentMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/contents/:contentID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/contents/${contentMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
