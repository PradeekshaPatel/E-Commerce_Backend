const Users = require('../models/userModel');
const jwt = require("jsonwebtoken");


// Signup
exports.signup = async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same email address" })
    }

    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
                user:{
                    id:user.id
                }
            }
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token });
};



// Login
exports.login = async (req, res) => {
    
    let user = await Users.findOne({ email: req.body.email });


    if(user){
            const passCompare = req.body.password === user.password;
            if(passCompare){
                    const data = {
                        user:{
                            id:user.id
                        }
                    }
                    const token = jwt.sign(data,process.env.JWT_SECRET);
                    res.json({success:true,token});
             }
            else{
                    res.json({success:false,errors:"Wrong Password"});
            }
             }
    else{
                    res.json({success:false,errors:"Wrong Email ID"});
                 }

};

// Additional functions as needed...
