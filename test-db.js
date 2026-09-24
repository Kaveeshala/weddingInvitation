const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/wedding"; // Assuming local or in .env
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const guests = await mongoose.connection.collection('guests').find().toArray();
  console.log(guests.map(g => ({
    name: g.name,
    englishName: g.englishName,
    englishGreeting: g.englishGreeting
  })));
  process.exit(0);
}
run().catch(console.error);
