const client = require("@sendgrid/mail");
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
  const { name, email, terms, updates } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please login." });
    }

    const otp = otps();
    await Otp.deleteMany({ email });

    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      email,
      otp: hashedOtp,
      userData: { name, email, terms, updates },
      expireAt: Date.now() + 5 * 60 * 1000,
    });

    await client.send({
      to: email,
      from: process.env.SEND_GRID_EMAIL,
      subject: "Verify your email - Mutes",
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

let postLogin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found you may sign-up first " });
    }

    const otp = otps();

    await Otp.deleteMany({ email });

    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      email,
      otp: hashedOtp,
      expireAt: Date.now() + 5 * 60 * 1000,
    });

    await client.send({
      to: email,
      from: process.env.SEND_GRID_EMAIL,
      subject: "Verify your email - Mutes",
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "unable to login user" });
  }
};

const PostResend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const existingOtp = await Otp.findOne({ email });

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

    await client.send({
      to: email,
      from: process.env.SEND_GRID_EMAIL,
      subject: "Verify your email - Mutes",
      text: `Your OTP is ${otp}`,
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

const postOtpVerification = async (req, res,next) => {
  const { email, otp, guestId } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  try {
    const otpDoc = await Otp.findOne({ email });
    if (!otpDoc) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    if (Date.now() > otpDoc.expireAt) {
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, otpDoc.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create(otpDoc.userData);
    }

    // Handle wishlist merging - FIXED VERSION
    try {
      if (guestId && guestId !== 'undefined' && guestId !== 'null') {
        const guestWishlist = await WishlistModel.findOne({ guestId });
        const userWishlist = await WishlistModel.findOne({ user: user._id });

        if (guestWishlist && guestWishlist.products.length > 0) {
          if (!userWishlist) {
            // Create user wishlist from guest wishlist
            await WishlistModel.create({
              user: user._id,
              products: guestWishlist.products,
              guestId: null
            });
            await WishlistModel.deleteOne({ _id: guestWishlist._id });
          } else {
            // Merge guest wishlist into user wishlist
            const mergedProducts = new Set([
              ...userWishlist.products.map(id => id.toString()),
              ...guestWishlist.products.map(id => id.toString())
            ]);
            
            userWishlist.products = Array.from(mergedProducts).map(id => 
              mongoose.Types.ObjectId.isValid(id) ? id : null
            ).filter(id => id !== null);
            
            await userWishlist.save();
            await WishlistModel.deleteOne({ _id: guestWishlist._id });
          }
        }
      }
    } catch (wishlistError) {
      console.error('Wishlist merge error:', wishlistError);
      // Don't fail authentication due to wishlist error
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    
    await authorizedCart(guestId,user);

    await Otp.deleteOne({ email });

    

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        userId: user._id
      },
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: "Server error during OTP verification" });
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
