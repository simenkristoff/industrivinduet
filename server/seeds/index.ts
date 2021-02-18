import mongoose from 'mongoose';

const seeds: { [key: string]: Array<any> } = {
  Option: require('./1-options/options.seed'),
  Content: require('./2-contents/contents.seed'),
  Studyfield: require('./3-studyfields/studyfields.seed'),
  Partner: require('./4-partners/partners.seed'),
  Group: require('./5-groups/groups.seed'),
  Role: require('./6-roles/roles.seed'),
  Member: require('./7-members/members.seed'),
  User: require('./8-users/users.seed'),
  Event: require('./9-events/events.seed'),
  Job: require('./10-jobs/jobs.seed'),
};

export async function seedDatabase(runSaveMiddleware = false) {
  try {
    await Object.keys(seeds).map((seed, index) => {
      const model = mongoose.models[seed];
      if (!model) throw new Error(`Cannot find Model '${seed}'`);

      runSaveMiddleware ? model.create(seeds[seed]) : model.insertMany(seeds[seed]);
    });
  } catch (err) {
    console.log(err);
  }
}
