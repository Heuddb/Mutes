const mongoose = require('mongoose');
const User = require('./User');

const Cart = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
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


module.exports = mongoose.model('Cart',Cart);