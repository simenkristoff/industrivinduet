import mongoose from 'mongoose';

/* global beforeAll beforeEach afterEach afterAll */
const { seedDatabase } = require('./seeds');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.drop();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
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
}

module.exports = {
  setupDB(databaseName: string, runSaveMiddleware: boolean = false) {
    // Connect to Mongoose
    beforeAll(async () => {
      await mongoose.connect(`mongodb://127.0.0.1`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: databaseName,
      });
    });

    // Seeds database before each test
    beforeEach(async () => {
      await seedDatabase(runSaveMiddleware);
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
};
