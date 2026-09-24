const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const collection = mongoose.connection.collection('guests');
  const guests = await collection.find({ englishName: /&/ }).toArray();
  for (const g of guests) {
    if (g.englishName) {
      let newName = g.englishName.replace(/([^\s])&/g, '$1 &').replace(/&([^\s])/g, '& $1');
      if (newName !== g.englishName) {
        await collection.updateOne({ _id: g._id }, { $set: { englishName: newName } });
        console.log(`Updated: ${g.englishName} -> ${newName}`);
      }
    }
  }
  process.exit(0);
}
run().catch(console.error);
