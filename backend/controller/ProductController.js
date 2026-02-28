const ProductModel = require("../model/ProductModel");

let getAllProducts = async (req, res) => {
  try {
    const query = { isActive: true };

    // CATEGORY (MEN, WOMEN, BAGS)
    if (req.query.category) {
      query.category = req.query.category.toUpperCase();
    }

    // PRICE RANGE
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // SIZE
    if (req.query.size) {
      query["attributes.size"] = req.query.size;
    }

    // COLOR
    if (req.query.color) {
      query["attributes.color"] = req.query.color;
    }

    let sort = { createdAt: -1 };

    if (req.query.sort === "price-low") sort = { price: 1 };
    if (req.query.sort === "price-high") sort = { price: -1 };
    if (req.query.sort === "rating") sort = { "ratings.average": -1 };

    const products = await ProductModel.find(query).sort(sort);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching products"
    });
  }
};




let getProductById = async (req, res, next) => {
  try {
    const products = await ProductModel.findById(req.params.id);

    if (!products || !products.isActive) {
      return res.status(404).json({
        sucess: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      sucess: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error in fetching products",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
