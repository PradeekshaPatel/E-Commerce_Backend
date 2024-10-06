// controllers/cartController.js
const Users = require('../models/userModel'); 

const addToCart = async (req, res) => {
    try {
        console.log("Added", req.body.itemId); 
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
        res.send("Added");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error"); // Handle errors
    }
};

const removeFromCart = async (req, res) => {
    try {
        console.log("Removed", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1; 
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed"); 

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error"); // Handle errors
    }
};

// Function to get cart data
const getCartData = async (req, res) => {
    try {
        console.log("GetCart"); 
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error(error); // Log error
        res.status(500).send("Server Error"); // Handle errors
    }
};


module.exports = { addToCart, removeFromCart, getCartData };
