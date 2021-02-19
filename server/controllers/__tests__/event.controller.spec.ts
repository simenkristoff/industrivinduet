import { Server } from 'http';

import supertest from 'supertest';

import { genTestToken } from '../../utils/genToken';
import { EventController } from '../';
import { Event } from '../../types';
import App from '../../app';
import { seedDatabase } from '../../seeds';
import events from '../../seeds/9-events/events.seed';

describe('Test Event Controller', () => {
  var app: App, server: Express.Application, instance: Server, auth: string;

  // Event mock
  var eventMock: Event;

  beforeAll(async (done) => {
    app = new App([new EventController()]);
    server = app.getServer();
    instance = app.listen();
    await seedDatabase(true, ['Event']).then((res) => {
      if (res) done();
    });
  }, 5000);
  afterAll((done) => {
    return instance && instance.close(done);
  });

  /**
   * GET all
   */
  it('Request GET /api/events', async (done) => {
    const result = await supertest(server).get('/api/events').send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(events.length);
    done();
  });

  it('Request GET /api/events for active events', async (done) => {
    const result = await supertest(server).get('/api/events/active').send();

    expect(result.status).toBe(200);
    const events: Event[] = result.body;
    expect(events.every((event) => event.active === true)).toBeTruthy();
    done();
  });

  /**
   * GET by Id
   */

  it('Request GET /api/events/:eventID', async (done) => {
    const result = await supertest(server).get(`/api/events/${events[2]._id}`).send();
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(events[2].title);
    eventMock = result.body;
    done();
  });

  /**
   * POST create
   */
  it('Request POST /api/events should return 401 NOT AUTHORIZED', async (done) => {
    eventMock._id = undefined;
    eventMock.title = 'Test event';
    const result = await supertest(server).post(`/api/events`).send(eventMock);
    expect(result.status).toBe(401);
    await genTestToken().then((value) => {
      auth = value;
    });
    done();
  });

  it('Request POST /api/events', async (done) => {
    const result = await supertest(server)
      .post(`/api/events`)
      .set('Authorization', `JWT ${auth}`)
      .send(eventMock);
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(eventMock.title);
    eventMock = result.body;
    done();
  });

  /**
   * PUT update
   */
  it('Request PUT /api/events/:eventID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).put(`/api/events/${eventMock._id}`).send(eventMock);
    expect(result.status).toBe(401);
    done();
  });

  it('Request PUT /api/events/:eventID', async (done) => {
    eventMock.title = 'Test event 2';
    const result = await supertest(server)
      .put(`/api/events/${eventMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send(eventMock);
    expect(result.status).toBe(200);
    expect(result.body.title).toBe(eventMock.title);
    done();
  });

  /**
   * DELETE
   */
  it('Request DELETE /api/events/:eventID should return 401 NOT AUTHORIZED', async (done) => {
    const result = await supertest(server).delete(`/api/events/${eventMock._id}`).send();
    expect(result.status).toBe(401);
    done();
  });

  it('Request DELETE /api/events/:eventID', async (done) => {
    const result = await supertest(server)
      .delete(`/api/events/${eventMock._id}`)
      .set('Authorization', `JWT ${auth}`)
      .send();
    expect(result.status).toBe(200);
    expect(result.body.status).toBe('success');
    done();
  });
});
