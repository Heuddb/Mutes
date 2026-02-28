const AddressModel = require("../model/AddressModel");
const CartModel = require("../model/CartModel");
const OrdersModel = require("../model/OrdersModel");

let getMyOrders = async (req, res, next) => {
  try {
    const user = req.user?._id || req.user?.id;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let orders = await OrdersModel.find({ user })
      .select(
        "orderId items pricing shippingAddress orderStatus paymentMethod trackingId estimatedDelivery deliveredAt createdAt",
      )
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(200).json({
        success: true,
        orders: [],
      });
    }
    res
      .status(200)
      .json({ success: true, orders, message: "orders fetched successfully" });
  } catch (error) {
    console.error("getMyOrders error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let prepareOrder = async (req, res, next) => {
  try {
    const user = req.user?._id || req.user?.id;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { addressId, paymentMethod } = req.body;

    if (!addressId || !paymentMethod) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const cart = await CartModel.findOne({ user }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const addressDoc = await AddressModel.findOne({ user });

    if (!addressDoc) {
      return res.status(404).json({ message: "Address not found" });
    }

    const selectedAddress = addressDoc.addresses.id(addressId);

    if (!selectedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    let totalAmount = 0;

    let orderItems = cart.items.map((items) => {
      totalAmount += items.price * items.quantity;
      return {
        product: items.product._id,
        name: items.product.name,
        image: items.product.images[0],
        size: items.size,
        quantity: items.quantity,
        price: items.price
      };
    });
    

    let shippingCharges = totalAmount > 2000 ? 50 : 0;

    let tax = totalAmount * 0.08;

    let totalPayableAmount = totalAmount + shippingCharges + tax;

    let order = new OrdersModel({
      user,
      orderId: `ORD-${Date.now()}`,
      items: orderItems,
      shippingAddress: {
        fullName: selectedAddress.fullName,
        mobile: selectedAddress.mobile,
        Address: selectedAddress.Address,
        city: selectedAddress.city,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
      },
      paymentMethod,
      paymentStatus: "PENDING",
      orderStatus: "PLACED",
      pricing: {
        subtotal: totalAmount,
        shipping: shippingCharges,
        tax,
        total: totalPayableAmount,
      },
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res
      .status(201)
      .json({ success: true, order, message: "Order placed successfully" });
  } catch (error) {
    console.error("prepareOrder error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getMyOrders,
  prepareOrder,
};
