import mongoose from 'mongoose';

type Seeds = { [key: string]: NodeRequire };

const seeds: Seeds = {
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
type seedKeys =
  | 'Option'
  | 'Content'
  | 'Studyfield'
  | 'Partner'
  | 'Group'
  | 'Role'
  | 'Member'
  | 'User'
  | 'Event'
  | 'Job';

export async function seedDatabase(runSaveMiddleware = false, collections?: seedKeys[]) {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      if (collections) {
        collections.map(async (value) => {
          await dropCollection(value);
          await createCollection(runSaveMiddleware, value);

          return resolve(true);
        });
      } else {
        Object.keys(seeds).map((seed) => {
          dropCollection(seed);
          const model = mongoose.models[seed];
          console.log(model);
          console.log(seeds[seed]);
          if (!model) throw new Error(`Cannot find Model '${seed}'`);

          runSaveMiddleware ? model.create(seeds[seed]) : model.insertMany(seeds[seed]);
          console.log(`Initialized collection ${seed}`);
        });
      }
    } catch (err) {
      console.log(err);

      return reject(false);
    }
  });
}

async function createCollection(runSaveMiddleware: boolean, modelName: string) {
  const model = mongoose.models[modelName];
  if (!model) throw new Error(`Cannot find Model '${modelName}'`);

  runSaveMiddleware
    ? await model.create(seeds[modelName])
    : await model.insertMany(seeds[modelName]);
  console.log(`Initialized collection ${modelName}`);
}

async function dropCollection(modelName: string) {
  const collectionName = modelName.toLowerCase() + 's';
  const collection = mongoose.connection.collections[collectionName];
  try {
    await collection.drop();
  } catch (error) {
    // Sometimes this error happens, but you can safely ignore it
    if (error.message === 'ns not found') return;
    // This error occurs when you use it.todo. You can
    // safely ignore this error too
    if (error.message.includes('a background operation is currently running')) return;
    console.log(error.message);
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === 'ns not found') return;
      if (error.message.includes('a background operation is currently running')) return;
      console.log(error.message);
    }
  }
}
