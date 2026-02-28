const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discountPrice: {
      type: Number
    },

    category: {
      type: String,
      required: true,
      enum: ["FASHION","MEN", "WOMEN", "BAGS", "SHOES", "ACCESSORIES"],
      index: true
    },

    subCategory: {
      type: String,
      index: true
    },

    brand: {
      type: String
    },

    images: [
      {
        type: String,
        required: true
      }
    ],

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    attributes: {
      size: [String],       // S, M, L, XL (fashion)
      color: [String],      // Red, Black, White
      material: String,     // Leather, Cotton
      gender: {
        type: String,
        enum: ["MEN", "WOMEN", "UNISEX"]
      }
    },

    ratings: {
      average: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    },

    isActive: {
      type: Boolean,
      default: true
    },

    condition:{
      type:String,
      enum:["New","Popular","Winter"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);
