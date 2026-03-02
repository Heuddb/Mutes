const ProductModel = require("../model/ProductModel");

let getAllProducts = async (req, res) => {
  try {
    const query = { isActive: true };

    // SEARCH FUNCTIONALITY
    if (req.query.search) {
      const searchTerm = req.query.search.trim();
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { brand: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } }
      ];
    }

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

    // CONDITION
    if (req.query.condition) {
      query.condition = req.query.condition;
    }

    // GENDER
    if (req.query.gender) {
      query["attributes.gender"] = req.query.gender;
    }

    // PAGINATION
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 12); // Max 50, default 12
    const skip = (page - 1) * limit;

    let sort = { createdAt: -1 };

    if (req.query.sort === "price-low") sort = { price: 1 };
    if (req.query.sort === "price-high") sort = { price: -1 };
    if (req.query.sort === "rating") sort = { "ratings.average": -1 };
    if (req.query.sort === "newest") sort = { createdAt: -1 };
    if (req.query.sort === "popularity") sort = { "ratings.count": -1 };

    // Get total count for pagination
    const totalCount = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch products with optimized field selection for list view
    const products = await ProductModel.find(query)
      .select("name price discountPrice images category attributes.gender brand condition ratings.average")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for read-only queries - faster

    // Add cache headers
    res.set({
      "Cache-Control": "public, max-age=300" // Cache for 5 minutes
    });

    res.status(200).json({
      success: true,
      count: products.length,
      totalCount,
      page,
      totalPages,
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching products"
    });
  }
};




let getProductById = async (req, res, next) => {
  try {
    const products = await ProductModel.findById(req.params.id).lean(); // Use lean() for better performance

    if (!products || !products.isActive) {
      return res.status(404).json({
        sucess: false,
        message: "Product not found",
      });
    }

    // Add cache headers - longer for detail pages
    res.set({
      "Cache-Control": "public, max-age=600" // Cache for 10 minutes
    });

    res.status(200).json({
      sucess: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
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
