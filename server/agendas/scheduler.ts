/**
 * Module responsible for running repeatable tasks on the server.
 * @module scheduler
 */
import Agenda from 'agenda';

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const agenda = new Agenda({
  db: { address: url, collection: 'schedules', options: { useUnifiedTopology: true } },
  processEvery: '30 seconds',
});

// Setup tasks
require('./tasks/archiveEvents')(agenda);
require('./tasks/archiveJobs')(agenda);

/**
 * Runs the scheduler.
 * @function @async
 * @memberof scheduler
 */
export async function scheduler() {
  const eventReport = agenda.create('archive events');
  const jobReport = agenda.create('archive jobs');
  await agenda.start();
  await eventReport.repeatEvery('1 days').save();
  await jobReport.repeatEvery('1 days').save();
}
