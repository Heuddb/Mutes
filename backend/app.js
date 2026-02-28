require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const auth = require("./routes/Authantication");
const cart = require('./routes/CartApi')
const cors = require("cors");
const wishList = require("./routes/WishList");
const products = require("./routes/ProductApi");
const address = require("./routes/Address");
const orders = require("./routes/Order");
const razorpayRoute = require("./routes/RazorpayRoutes");

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(products)
app.use(wishList)
app.use(auth);
app.use(cart);
app.use(address);
app.use(orders)
app.use(razorpayRoute)




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
