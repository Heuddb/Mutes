/*
Script to clean up duplicate guest carts and ensure proper indexes on the Cart collection.
Run with:

  node backend/scripts/fixCartIndexes.js

Make sure your .env has a valid MONGO_URL.
*/

require('dotenv').config();
const mongoose = require('mongoose');
const Cart = require('../model/CartModel');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // *** backup section: export carts with null user and current indexes ***
    const dbColl = mongoose.connection.db.collection('carts');
    const existingIndexes = await dbColl.indexes();
    console.log('existing indexes before cleanup:', existingIndexes);
    // dump offending carts to a file so they can be restored if needed
    const carts = await Cart.find({ $or: [{ user: null }, { user: { $exists: false } }] }).lean();
    const fs = require('fs');
    fs.writeFileSync(
      'backend/scripts/cart_backup_before.json',
      JSON.stringify({ timestamp: new Date(), carts, indexes: existingIndexes }, null, 2)
    );
    console.log(`backed up ${carts.length} cart(s) to backend/scripts/cart_backup_before.json`);

    // drop any old uniques that do not respect the new partial index rules
    const legacyUserIndex = existingIndexes.find(i => i.name === 'user_1');
    if (legacyUserIndex) {
      await dbColl.dropIndex('user_1');
      console.log('dropped legacy user_1 index');
    }
    const legacyGuestIndex = existingIndexes.find(i => i.name === 'guestId_1');
    if (legacyGuestIndex && !legacyGuestIndex.partialFilterExpression) {
      await dbColl.dropIndex('guestId_1');
      console.log('dropped legacy guestId_1 index');
    }

    // find documents where user is null or not set
    console.log(`found ${carts.length} cart(s) without a user field`);

    if (carts.length > 1) {
      // keep first, remove the rest
      const toRemove = carts.slice(1).map((c) => c._id);
      const res = await Cart.deleteMany({ _id: { $in: toRemove } });
      console.log(`deleted ${res.deletedCount} duplicate cart(s)`);
    } else {
      console.log('no duplicates to remove');
    }

    // sync indexes defined in the schema (partial unique ones)
    const idx = await Cart.syncIndexes();
    console.log('syncIndexes result:', idx);

    console.log('Cleanup complete');
  } catch (err) {
    console.error('error during cleanup:', err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
