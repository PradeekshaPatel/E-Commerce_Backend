const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

console.log("routes wale page me aa gye product walw me")
router.post('/addproduct', productController.addProduct);
router.get('/allproducts', productController.getAllProducts);
router.post('/removeproduct', productController.removeProduct);
router.get("/newcollections", productController.getNewCollections); // Updated endpoint
router.get("/popularinwomen", productController.getPopularInWomen);
// Additional product-related routes...
module.exports = router;
