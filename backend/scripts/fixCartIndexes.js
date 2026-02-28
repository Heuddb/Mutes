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

    // find documents where user is null or not set
    const carts = await Cart.find({ $or: [{ user: null }, { user: { $exists: false } }] }).lean();
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
