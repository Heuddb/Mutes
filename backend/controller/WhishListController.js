const WishlistModel = require("../model/WishlistModel");
const CartModel = require("../model/CartModel");

let getWishList = async (req, res, next) => {
  try {
    const { guestId } = req.query;
    const user = req.user?.id || null;

    let wishlist = await WishlistModel.findOne(
      user ? { user } : { guestId },
    ).populate("products");

    res.status(200).json({
      success: true,
      products: wishlist ? wishlist.products : [],
      message: wishlist
        ? "Wishlist retrieved successfully"
        : "No wishlist found",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let postWishList = async (req, res, next) => {
  try {
    const { guestId, productId } = req.body;
    const user = req.user?.id || null;

    let wishlist = await WishlistModel.findOne(user ? { user } : { guestId });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user,
        guestId,
        products: [productId],
      });

      return res.status(200).json({
        success: true,
        wishlist,
        message: "Product added to wishlist",
      });
    }

    const existingProduct = wishlist.products.some(
      (id) => id.toString() === productId.toString(),
    );

    if (!existingProduct) {
      wishlist.products.push(productId);
      await wishlist.save();
      res.status(200).json({ success: true, wishlist });
    } else {
      res.json({ success: false, message: "product already in wishlist" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let deleteWishList = async (req, res, next) => {
  try {
    const { productId, guestId } = req.body;
    const user = req.user?.id || null;
    const wishlist = await WishlistModel.findOne(user ? { user } : { guestId });

    if (!wishlist) {
      return res.json({ success: false, message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId.toString(),
    );

    await wishlist.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let moveToCart = async (req, res) => {
  try {
    const user = req.user?.id || null;
    
    const { guestId, data } = req.body;

    const {products, quantity, size, price} = data;

    if (!user && !guestId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let wishlist = await WishlistModel.findOne(
      user ? { user } : { guestId },
    )

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    let existingProduct = wishlist.products.some(
      (id) => id.toString() === products.toString(),
    );

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    let cart = await CartModel.findOne(user ? { user } : { guestId });

    if (!cart) {
      cart = new CartModel(user ? { user, items: [] } : { guestId, items: [] });
    }

    let existingCartItem = cart.items.find(
      (item) =>
        item.product.toString() === products.toString() && item.size === size,
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.items.push({
        product: products,
        quantity,
        size,
        price,
      });
    }
    await cart.save();

  wishlist.products = wishlist.products.filter(
  (id) => id.toString() !== products.toString()
);

await wishlist.save();
    

    return res.status(200).json({
      success: true,
      message: "Product moved from wishlist to cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWishList,
  postWishList,
  deleteWishList,
  moveToCart,
};
