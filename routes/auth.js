const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");

//REGISTER USER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try{
        const savedUser = await newUser.save();

        return res.json({
            status: true,
            message: 'success.registration',
            data: savedUser
        });
    }catch(err){
        return res.json({
            status: false,
            message: err.message,
            data: null
        });
    }

});



module.exports = router;