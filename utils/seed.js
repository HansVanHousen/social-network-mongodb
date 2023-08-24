

const connection = require('../config/connection');
const { Username, Thoughts } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await Username.deleteMany({});

  // Drop existing students
  await Thoughts.deleteMany({});

  // Add users to the collection and await the results
  await Username.collection.insertMany(username);

  // Add thoughts to the collection and await the results
  await Thoughts.collection.insertOne({
    Thoughts: 'suck it',
    // inPerson: false,
    username: [...Username],
  });

  // Log out the seed data to indicate what should appear in the database
//   console.table(username);
//   console.info('Seeding complete! 🌱');
//   process.exit(0);
});
