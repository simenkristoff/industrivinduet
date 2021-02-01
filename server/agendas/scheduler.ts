import Agenda from 'agenda';

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const agenda = new Agenda({
  db: { address: url, collection: 'schedules', options: { useUnifiedTopology: true } },
  processEvery: '30 seconds',
});

require('./tasks/archiveEvents')(agenda);
require('./tasks/archiveJobs')(agenda);

export async function scheduler() {
  const eventReport = agenda.create('archive events');
  const jobReport = agenda.create('archive jobs');
  await agenda.start();
  await eventReport.repeatEvery('1 days').save();
  await jobReport.repeatEvery('1 days').save();
}
