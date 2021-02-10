import Agenda from 'agenda';

const {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_NAME,
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
} = process.env;
const url = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
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
