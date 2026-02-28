const mongoose = require('mongoose');
const User = require('./User');

const Cart = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // no default; absence of the field distinguishes guest carts
    },

    guestId:{
        type:String,
        default:null
    },

   items:[{
     product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
    },
    size:{
        type:String,
        default:null
    },
    price:{
        type:Number,
        required:true,
    }
   }]
   
})

// Ensure only one cart per authenticated user, but allow multiple guest carts.
// Use a partial index so documents with `user: null` are not considered.
Cart.index({ user: 1 }, { unique: true, partialFilterExpression: { user: { $ne: null } } });
// Ensure guestId is unique when present
Cart.index({ guestId: 1 }, { unique: true, partialFilterExpression: { guestId: { $ne: null } } });


module.exports = mongoose.model('Cart',Cart);