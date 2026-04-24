const client = require("@sendgrid/mail");
const axios = require("axios");
client.setApiKey(process.env.SENDGRID_API_KEY);
const otps = require("../utils/otps");
const User = require("../model/User");
const Otp = require("../model/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const WishlistModel = require("../model/WishlistModel");
const { set } = require("mongoose");
const authorizedCart = require("../services/authanticatedCart");

const postSignUp = async (req, res) => {
  const { name, email, phone, terms, updates } = req.body;

  // Check each field
  if (!email) {
    console.log("Missing email");
    return res.status(400).json({ message: "Email is required" });
  }

  if (!phone) {
    console.log("Missing phone");
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please login." });
    }

    const otp = otps();

    await Otp.deleteMany({ phone });

    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      phone,
      otp: hashedOtp,
      userData: { name, email, terms, updates },
      expireAt: Date.now() + 5 * 60 * 1000,
    });

    //  SEND SMS HERE
    const smsResponse = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.SMS_KEY,
        route: "q",
        message: `Your OTP for mutes store is ${otp}`,
        language: "english",
        flash: 0,
        numbers: `91${phone}`
      },
    });
  

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
   
   

    // Send more specific error
    res.status(500).json({
      message: "Server error",
      error: error.message,
      details: error.response?.data || error.toString(),
    });
  }
};

let postLogin = async (req, res, next) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found you may sign-up first " });
    }

    const otp = otps();


    await Otp.deleteMany({ phone });

    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      phone,
      otp: hashedOtp,
      expireAt: Date.now() + 5 * 60 * 1000,
    });
 
    // Send SMS via Fast2SMS
    const smsResponse = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.SMS_KEY,
        route: "q",
        message: `Your OTP is ${otp}`,
        language: "english",
        flash: 0,
        numbers: `91${phone}`,
      },
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "unable to login user" });
  }
};

const PostResend = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const existingOtp = await Otp.findOne({ phone });

    if (!existingOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP session expired. Please login again.",
      });
    }

    /* RATE LIMIT: 60 seconds */
    const now = Date.now();

    if (existingOtp.updatedAt && now - existingOtp.updatedAt < 120 * 1000) {
      return res.status(429).json({
        success: false,
        message: "Please wait before requesting another OTP",
      });
    }

    const otp = otps();
    const hashedOtp = await bcrypt.hash(otp, 10);

    existingOtp.otp = hashedOtp;
    existingOtp.expireAt = now + 5 * 60 * 1000;
    await existingOtp.save();

  
        // Send SMS 
    const smsResponse = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.SMS_KEY,
        route: "q",
        message: `Your OTP for mutes store is ${otp}`,
        language: "english",
        flash: 0,
        numbers: `91${phone}`,
      },
    });
    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

const postOtpVerification = async (req, res, next) => {
  const { phone, otp, guestId } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: "Phone and OTP required" });
  }

  try {
    const otpDoc = await Otp.findOne({ phone });

    if (!otpDoc) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    if (Date.now() > otpDoc.expireAt) {
      await Otp.deleteOne({ phone });
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, otpDoc.otp);
    if (!isMatch) {
      console.log("Invalid OTP");
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      // Validate userData exists
      if (!otpDoc.userData || !otpDoc.userData.name || !otpDoc.userData.email) {
        console.error("Missing userData:", otpDoc.userData);
        return res.status(400).json({
          message: "User data missing. Please sign up again.",
        });
      }

      user = await User.create({
        name: otpDoc.userData.name,
        email: otpDoc.userData.email,
        phone: phone,
        terms: otpDoc.userData.terms || false,
        updates: otpDoc.userData.updates || false,
      });
    }

    // Wishlist merge (with better error handling)
    try {
      if (guestId && guestId !== "undefined" && guestId !== "null") {
        const guestWishlist = await WishlistModel.findOne({ guestId });
        const userWishlist = await WishlistModel.findOne({ user: user._id });

        if (
          guestWishlist &&
          guestWishlist.products &&
          guestWishlist.products.length > 0
        ) {
          if (!userWishlist) {
            await WishlistModel.create({
              user: user._id,
              products: guestWishlist.products,
              guestId: null,
            });
            await WishlistModel.deleteOne({ _id: guestWishlist._id });
            console.log("Guest wishlist moved to user");
          } else {
            const mergedProducts = new Set([
              ...userWishlist.products.map((id) => id.toString()),
              ...guestWishlist.products.map((id) => id.toString()),
            ]);

            userWishlist.products = Array.from(mergedProducts);
            await userWishlist.save();
            await WishlistModel.deleteOne({ _id: guestWishlist._id });
            console.log("Wishlists merged");
          }
        }
      }
    } catch (wishlistError) {
      res
        .status(500)
        .json({
          message: "Error processing wishlist. Please try again later.",
        });
      // Don't fail authentication due to wishlist error
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, phone: user.phone },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // Authorize cart (with error handling)
    try {
      console.log("Processing cart authorization...");
      if (authorizedCart) {
        await authorizedCart(guestId, user);
        console.log("Cart authorized successfully");
      }
    } catch (cartError) {
      console.error("Cart authorization error:", cartError.message);
      // Don't fail authentication due to cart error
    }

    console.log("Deleting OTP record...");
    await Otp.deleteOne({ phone });

    console.log("VERIFICATION SUCCESSFUL");
    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        userId: user._id,
        phone: user.phone,
      },
    });
  } catch (error) {
    // Send detailed error for debugging
    res.status(500).json({
      message: "Server error during OTP verification",
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

let Logout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

module.exports = {
  postSignUp,
  postLogin,
  postOtpVerification,
  PostResend,
  Logout,
};
