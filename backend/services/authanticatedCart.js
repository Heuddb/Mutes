const CartModel = require('../model/CartModel');

const authorizedCart = async (guestId, userIdentifier) => {
  try {
    // 1. Validate inputs
    if (!guestId || guestId === 'undefined' || guestId === 'null') return;
    
    // 2. Get guest cart
    const guestCart = await CartModel.findOne({ guestId });
    if (!guestCart || guestCart.items.length === 0) return;

    // 3. Extract user ID (whether we got full user object or just ID)
    const userId = typeof userIdentifier === 'object'
      ? userIdentifier._id
      : userIdentifier;

    // 4. Find or create user cart
    let userCart = await CartModel.findOne({ user: userId });

    if (!userCart) {
      // Case 1: No user cart → create one with guest items
      await CartModel.create({
        user: userId,
        items: guestCart.items,
        guestId: null
      });
      // Delete guest cart
      await CartModel.deleteOne({ _id: guestCart._id });
      return;
    }

    // 5. Case 2: User cart exists → merge guest items
    const productMap = new Map();

    // Add existing user items
    userCart.items.forEach(item => {
      productMap.set(item.product.toString(), {
        product: item.product,
        quantity: item.quantity,
        price: item.price
      });
    });

    // Merge guest items
    guestCart.items.forEach(item => {
      const prodId = item.product.toString();
      if (productMap.has(prodId)) {
        // Increase quantity if product already in cart
        productMap.get(prodId).quantity += item.quantity;
      } else {
        productMap.set(prodId, {
          product: item.product,
          quantity: item.quantity,
          price: item.price
        });
      }
    });

    // Update user cart with merged items
    userCart.items = Array.from(productMap.values());
    await userCart.save();

    // Delete guest cart
    await CartModel.deleteOne({ _id: guestCart._id });

  } catch (error) {
    console.error('❌ Cart merge error:', error);
  }
};

module.exports = authorizedCart;