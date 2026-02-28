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

1. Drop any existing legacy unique indexes (`user_1` and un‑filtered `guestId_1`).
2. Delete all but one cart document where `user` is `null` or missing.
3. Synchronize the schema indexes, creating a partial unique index on `user` and `guestId`.

After running it, restart your server. A JSON backup named `backend/scripts/cart_backup_before.json` will be created containing any carts that had `user:null` along with the pre‑cleanup index list; you can restore them manually if something goes wrong.

To manually back up or revert the entire collection you can also use `mongodump`/`mongorestore`:

```bash
# take a dump of just the carts collection
mongodump --db=mutes --collection=carts --out=../backup
# later, to restore the dump
mongorestore --db=mutes --collection=carts ../backup/mutes/carts.bson
```

If you prefer to drop the old index yourself instead of running the script, use the Mongo shell:

```js
use mutes
// list indexes
db.carts.getIndexes()
// drop the offending index (replace name if different)
db.carts.dropIndex('user_1')
```

```
