import Agenda from 'agenda';
import { Logger } from '@server/utils';
import { JobModel } from '@server/models';

module.exports = (agenda: Agenda) => {
  agenda.define('archive jobs', { priority: 'high' }, async (job, done) => {
    await JobModel.find((err, docs) => {
      if (err) {
        Logger.debug('[Archive Jobs]: Task failed');
        done();
      }

      docs.forEach((doc) => {
        if (doc.active) {
          const hasPassed: boolean = new Date().getTime() >= doc.deadline.getTime() ? true : false;
          if (hasPassed) {
            doc.updateOne({ active: false }, { new: true }, (err, res) => {
              if (err) {
                Logger.debug(`[Archive Jobs]: Failed to archive job with id ${doc._id}`);
                done();
              }
              Logger.debug(`[Archive Jobs]: Successfully archived job with id ${doc._id}`);
            });
          }
        }
      });
    });
    done();
  });
};
