// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/auth"); 
const cartController = require("../controllers/cartController");

// Define your cart-related routes
router.post("/addtocart", fetchUser, cartController.addToCart); 
router.post("/removefromcart", fetchUser, cartController.removeFromCart);
router.post("/getcart", fetchUser, cartController.getCartData);

module.exports = router; // Export the router
