import Agenda from 'agenda';
import { Logger } from '@server/utils';
import { EventModel } from '@server/models';

module.exports = (agenda: Agenda) => {
  agenda.define('archive events', { priority: 'high' }, async (job, done) => {
    await EventModel.find((err, docs) => {
      if (err) {
        Logger.debug('[Archive Events]: Task failed');
        done();
      }

      docs.forEach((doc) => {
        if (doc.active) {
          const hasPassed: boolean = new Date().getTime() >= doc.date.getTime() ? true : false;
          if (hasPassed) {
            doc.updateOne({ active: false }, { new: true }, (err, res) => {
              if (err) {
                Logger.debug(`[Archive Events]: Failed to archive event with id ${doc._id}`);
                done();
              }
              Logger.debug(`[Archive Events]: Successfully archived event with id ${doc._id}`);
            });
          }
        }
      });
    });
    done();
  });
};
