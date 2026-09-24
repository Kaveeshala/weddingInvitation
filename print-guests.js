const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const collection = mongoose.connection.collection('guests');
  const guests = await collection.find({}).toArray();
  for (const g of guests) {
    console.log(`- name: "${g.name}", englishName: "${g.englishName}"`);
  }
  process.exit(0);
}
run().catch(console.error);
