require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const auth = require("./routes/Authantication");
const cart = require('./routes/CartApi')
const cors = require("cors");
const wishList = require("./routes/WishList");
const products = require("./routes/ProductApi");
const address = require("./routes/Address");
const orders = require("./routes/Order");
const razorpayRoute = require("./routes/RazorpayRoutes");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*"
}));

// Enable compression for all responses
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(products)
app.use(wishList)
app.use(auth);
app.use(cart);
app.use(address);
app.use(orders)
app.use(razorpayRoute)

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
