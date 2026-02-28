# Mutes
Mutes the fashion e commerce website, built with the MERN stack. Features include JWT authentication, product listing, cart and address management, Razorpay payment integration, order creation with status tracking, and secure REST APIs using Node.js, Express, and MongoDB.

## Backend maintenance

### Fix duplicate cart index errors

If you encounter `E11000 duplicate key error collection: mutes.carts index: user_1 dup key: { user: null }`, the database contains multiple guest carts with a null `user` field.
A helper script is provided to remove duplicates and recreate the correct partial indexes:

```bash
# from workspace root
cd backend
node scripts/fixCartIndexes.js
```

The script will:

1. Delete all but one cart document where `user` is `null` or missing.
2. Synchronize the schema indexes, creating a partial unique index on `user` and `guestId`.

After running it, restart your server. You may also manually drop the old `user_1` index via the Mongo shell if needed:

```js
// connect to the database
use mutes
// list indexes
db.carts.getIndexes()
// drop the offending index (replace name if different)
db.carts.dropIndex('user_1')
```

```
