const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true // Add index for search
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      index: true // Add index for price range queries
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
      type: String,
      index: true // Add index for brand search
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
        default: 0,
        index: true // Add index for rating sort
      },
      count: {
        type: Number,
        default: 0
      }
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true // Important: filter active products
    },

    condition:{
      type:String,
      enum:["New","Popular","Winter"],
      index: true // Add index for condition filter
    }
  },
  { timestamps: true }
);

// Add compound index for common queries
Product.index({ isActive: 1, category: 1, price: 1 });
Product.index({ isActive: 1, "attributes.gender": 1, category: 1 });

module.exports = mongoose.model("Product", Product);
