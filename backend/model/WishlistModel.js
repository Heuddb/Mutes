const mongoose = require('mongoose')

const Wishlist = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:null,
      unique: true   // ONE wishlist per user
    },
    guestId:{
      type:String,
      default:null
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", Wishlist);
