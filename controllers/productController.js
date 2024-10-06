const Product = require('../models/productModel');

// Add Product

exports.addProduct = async (req, res) => {
    let products = await Product.find({});
    let id;
        if(products.length>0)
        {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id+1;
        }
        else{
            id=1;
        }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log("Saved");

    res.json({
        success: true, 
        name: req.body.name });
};


// Get All Products
exports.getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
};

// Remove Product
exports.removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({ 
        success: true,
         name: req.body.name 
        })
};

exports.getNewCollections = async (req, res) => {
    try {
        let products = await Product.find({});
        let newCollections = products.slice(1).slice(-8); // Get the last 8 products excluding the first
        console.log("NewCollection Fetched");
        res.json(newCollections); // Use res.json to send a JSON response
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
console.log("product controller me aa gy")
exports.getPopularInWomen = async (req, res) => {
    try {
        let products = await Product.find({ category: "women" });
        let popularInWomen = products.slice(0, 4); // Get the first 4 products in the "women" category
        console.log("Popular in women fetched");
        res.send(popularInWomen); // Use res.json to send a JSON response
    } catch (error) {
        console.error("Error fetching popular products in women:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
