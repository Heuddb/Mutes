const CartModel = require("../model/CartModel");
const authorizedCart = require("./../services/authanticatedCart");

// -------------------- GET CART --------------------
const getCart = async (req, res) => {
  try {
    const user = req.user?.id; // from JWT middleware
    const { guestId } = req.query;

    let cart;

    if (user) {
      cart = await CartModel.findOne({ user }).populate("items.product");
    } else {
      if (!guestId) {
        return res.status(400).json({
          success: false,
          message: "GuestId is required",
        });
      }
      cart = await CartModel.findOne({ guestId }).populate("items.product");
    }

    return res.status(200).json({
      success: true,
      cartItem: cart ? cart.items : [],
      message: cart ? "Cart retrieved successfully" : "No cart found",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- ADD TO CART --------------------
const addToCart = async (req, res) => {
  try {
    const user = req.user?.id;
    const { productId, quantity, size, price } = req.body;
    const { guestId } = req.query;

    let cart;

    if (user) {
      cart = await CartModel.findOne({ user });
    } else {
      // GUEST – require guestId
      if (!guestId) {
        return res.status(400).json({
          success: false,
          message: "GuestId required",
        });
      }
      cart = await CartModel.findOne({ guestId });
    }

    // No cart found → create one
    if (!cart) {
      const cartData = user
        ? { user, items: [{ product: productId, quantity, size, price }] }
        : { guestId, items: [{ product: productId, quantity, size, price }] };

      cart = await CartModel.create(cartData);

      return res.status(200).json({
        success: true,
        added: true,
        message: "Item added to cart",
        cart,
      });
    }

    // Check if product already in cart
    const alreadyExists = cart.items.some(
      (item) => item.product.toString() === productId,
    );

    if (alreadyExists) {
      return res.status(200).json({
        success: false,
        code: "ALREADY_IN_CART",
        message: "Product already in cart",
      });
    }

    // Add new item
    cart.items.push({ product: productId, quantity, size, price });
    await cart.save();

    return res.status(200).json({
      success: true,
      added: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = req.user?.id;
    const { productId } = req.body;
    const { guestId } = req.query;

    let filter;
    if (user) {
      filter = { user };
    } else {
      if (!guestId) {
        return res.status(400).json({
          success: false,
          message: "GuestId required",
        });
      }
      filter = { guestId };
    }

    const cart = await CartModel.findOneAndUpdate(
      filter,
      { $pull: { items: { product: productId } } },
      { new: true },
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- UPDATE CART ITEM --------------------
const updateCartItem = async (req, res) => {
  try {
    const user = req.user?.id;
    const { productId, size, quantity, price } = req.body;
    const { guestId } = req.query;

    if (!productId || quantity == null || price == null) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let filter;
    if (user) {
      filter = { user, "items.product": productId };
    } else {
      if (!guestId) {
        return res.status(400).json({
          success: false,
          message: "GuestId required",
        });
      }
      filter = { guestId, "items.product": productId };
    }

    const cart = await CartModel.findOneAndUpdate(
      filter,
      {
        $set: {
          "items.$.quantity": quantity,
          "items.$.price": quantity * price, // assuming price is unit price
        },
      },
      { new: true },
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart or product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
};
